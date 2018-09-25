// @flow
import React, { PureComponent, Fragment } from 'react';
import { APPLICANT_STATES } from '../constants';

import type { ApplicantType, ApplicantDataType } from '../types/Applicant';
import type { DashboardFilterType } from '../types/Dashboard';
import DashboardTable from './DashboardTable';
import DashboardFilter from './DashboardFilter';

export const DASHBOARD_COLUMNS: Array<string> = [
  APPLICANT_STATES.APPLIED,
  APPLICANT_STATES.INTERVIEWING,
  APPLICANT_STATES.HIRED,
];

const filterIndexOf = (subject: string, needle: string): boolean => (needle ? subject.indexOf(needle) !== -1 : true);

type Props = {};

type State = {
  filter: DashboardFilterType,
  applicants: ApplicantDataType,
};

class Dashboard extends PureComponent<Props, State> {
  state = {
    filter: {
      name: localStorage.getItem('nameFilter') || '',
      city: localStorage.getItem('cityFilter') || '',
    },
    applicants: {
      loading: false,
      data: {},
      error: null,
    },
  };

  componentDidMount(): void {
    this.setState(
      previousState => ({
        applicants: {
          ...previousState.applicants,
          loading: true,
        },
      }),
      this.fetchData
    );
  }

  fetchData = () =>
    fetch('https://randomuser.me/api/?nat=gb&results=5&seed=56308e5db1a68b03')
      .then(response => response.json())
      .then(({ results }) => {
        const data = results.reduce((acc, applicant) => {
          acc[applicant.login.uuid] = {
            ...applicant,
            state: APPLICANT_STATES.APPLIED,
          };

          return acc;
        }, {});

        this.setState(previousState => ({
          applicants: {
            ...previousState.applicants,
            loading: false,
            data,
          },
        }));
      })
      .catch(error => {
        this.setState(previousState => ({
          applicants: {
            ...previousState.applicants,
            loading: false,
            error,
          },
        }));
      });

  isVisible = (applicant: ApplicantType): boolean => {
    const { filter } = this.state;

    return (
      (filterIndexOf(applicant.name.first, filter.name) || filterIndexOf(applicant.name.last, filter.name)) &&
      filterIndexOf(applicant.location.city, this.state.filter.city)
    );
  };

  getDashboardApplicants = () => {
    const applicants: Array<ApplicantType> = (Object.values(this.state.applicants.data): Array<any>);

    return applicants.reduce(
      (acc, applicant: ApplicantType) => {
        if (this.isVisible(applicant)) {
          acc[applicant.state].push(applicant);
        }

        return acc;
      },
      {
        [APPLICANT_STATES.APPLIED]: [],
        [APPLICANT_STATES.INTERVIEWING]: [],
        [APPLICANT_STATES.HIRED]: [],
      }
    );
  };

  handleApplicantStateChange = (newState: string) => (uuid: string) => {
    this.setState(({ applicants }) => {
      const data = {
        ...applicants.data,
        [uuid]: {
          ...applicants.data[uuid],
          state: newState,
        },
      };

      return {
        applicants: {
          ...applicants,
          data,
        },
      };
    });
  };

  handleFilterChange = (name: string) => (e: SyntheticInputEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    localStorage.setItem(`${name}Filter`, value);

    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [name]: value,
      },
    }));
  };

  render() {
    const { applicants, filter } = this.state;

    if (applicants.loading) {
      return <div>Loading</div>;
    }

    if (applicants.error) {
      return <div>{applicants.error.message}</div>;
    }

    return (
      <Fragment>
        <DashboardFilter initialValues={filter} onFilterChange={this.handleFilterChange} />
        <DashboardTable
          columnOrder={DASHBOARD_COLUMNS}
          applicants={this.getDashboardApplicants()}
          onStateChange={this.handleApplicantStateChange}
        />
      </Fragment>
    );
  }
}

export default Dashboard;
