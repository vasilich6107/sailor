// @flow
import React, { PureComponent, Fragment } from 'react';
import DashboardColumn from './DashboardColumn';
import { APPLICANT_STATES } from '../constants';

import './Dashboard.css';
import type { Applicant, ApplicantData } from '../types/Applicant';
import type { DashboardApplicants, DashboardColumns, DashboardFilter } from '../types/Dashboard';

export const DASHBOARD_COLUMNS: Array<string> = [
  APPLICANT_STATES.APPLIED,
  APPLICANT_STATES.INTERVIEWING,
  APPLICANT_STATES.HIRED,
];

const filterIndexOf = (subject: string, needle: string): boolean => (needle ? subject.indexOf(needle) !== -1 : true);

type Props = {};

type State = {
  filter: DashboardFilter,
  applicants: ApplicantData,
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

  isVisible = (applicant: Applicant): boolean => {
    const { filter } = this.state;

    return (
      (filterIndexOf(applicant.name.first, filter.name) || filterIndexOf(applicant.name.last, filter.name)) &&
      filterIndexOf(applicant.location.city, this.state.filter.city)
    );
  };

  getDashboardApplicants = () => {
    const applicants: Array<Applicant> = (Object.values(this.state.applicants.data): Array<any>);

    return applicants.reduce(
      (acc, applicant: Applicant) => {
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

  renderColumn = (applicants: DashboardApplicants) => (column: string, index: number, source: DashboardColumns) => {
    const nextState: string = source[index + 1];
    const prevState: string = source[index - 1];

    return (
      <DashboardColumn
        key={column}
        columnName={column}
        applicants={applicants[column]}
        onNext={nextState && this.handleApplicantStateChange(nextState)}
        onPrevious={prevState && this.handleApplicantStateChange(prevState)}
      />
    );
  };

  render() {
    const { applicants, filter } = this.state;

    if (applicants.loading) {
      return <div>Loading</div>;
    }

    if (applicants.error) {
      return <div>{applicants.error.message}</div>;
    }

    const dashboardApplicants = this.getDashboardApplicants();

    return (
      <Fragment>
        <div className="filter">
          <div className="filter__item">
            <div>Name</div>
            <div>
              <input
                id="nameInput"
                type="text"
                placeholder="First or Last name"
                value={filter.name}
                onChange={this.handleFilterChange('name')}
              />
            </div>
          </div>
          <div className="filter__item">
            <div>Country</div>
            <div>
              <input
                id="cityInput"
                type="text"
                placeholder="Country"
                value={filter.city}
                onChange={this.handleFilterChange('city')}
              />
            </div>
          </div>
        </div>
        <div className="dashboard">{DASHBOARD_COLUMNS.map(this.renderColumn(dashboardApplicants))}</div>
      </Fragment>
    );
  }
}

export default Dashboard;
