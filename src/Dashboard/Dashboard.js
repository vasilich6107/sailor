import React, { PureComponent, Fragment } from 'react';
import DashboardColumn from './DashboardColumn';
import { APPLICANT_STATES } from '../constants';

import './Dashboard.css';

export const DASHBOARD_COLUMNS = [APPLICANT_STATES.APPLIED, APPLICANT_STATES.INTERVIEWING, APPLICANT_STATES.HIRED];

class Dashboard extends PureComponent {
  state = {
    filter: {
      name: localStorage.getItem('nameFilter') || '',
      city: localStorage.getItem('cityFilter') || '',
    },
    applicants: {
      loading: false,
      data: null,
      error: null,
    },
  };

  fetchData = fetch('https://randomuser.me/api/?nat=gb&results=5')
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

  componentDidMount() {
    this.setState(
      previousState => ({
        applicants: {
          ...previousState.applicants,
          loading: true,
        },
      }),
      () => this.fetchData
    );
  }

  getDashboardApplicants = () => {
    const applicants = Object.values(this.state.applicants.data);
    const { filter } = this.state;

    const filterIndexOf = (subject, needle) => (needle ? subject.indexOf(needle) !== -1 : true);

    return applicants.reduce(
      (acc, applicant) => {
        if (
          (filterIndexOf(applicant.name.first, filter.name) || filterIndexOf(applicant.name.last, filter.name)) &&
          filterIndexOf(applicant.location.city, this.state.filter.city)
        ) {
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

  handleApplicantStateChange = newState => uuid => {
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

  handleFilterChange = name => ({ target: { value } }) => {
    localStorage.setItem('nameFilter', value);

    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [name]: value,
      },
    }));
  };

  renderColumn = applicants => (column, index, source) => {
    const nextState = source[index + 1];
    const prevState = source[index - 1];

    return (
      <DashboardColumn
        key={column}
        columnName={column}
        applicants={applicants[column]}
        ff={nextState && this.handleApplicantStateChange(nextState)}
        rev={prevState && this.handleApplicantStateChange(prevState)}
      />
    );
  };

  render() {
    const { applicants, filter } = this.state;

    if (!applicants.data) {
      return null;
    }

    const dashboardApplicants = this.getDashboardApplicants();

    return (
      <Fragment>
        <div className="filter">
          <div className="filter__item">
            <div>Name</div>
            <div>
              <input
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
              <input type="text" placeholder="Country" value={filter.city} onChange={this.handleFilterChange('city')} />
            </div>
          </div>
        </div>
        <div className="dashboard">{DASHBOARD_COLUMNS.map(this.renderColumn(dashboardApplicants))}</div>
      </Fragment>
    );
  }
}

export default Dashboard;
