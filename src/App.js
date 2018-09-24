import React, { Component } from 'react';
import logo from './assets/images/logo.png';
import './App.css';

const APPLICANT_STATES = {
  APPLIED: 'APPLIED',
  INTERVIEWING: 'INTERVIEWING',
  HIRED: 'HIRED',
};

const DASHBOARD_COLUMNS = [APPLICANT_STATES.APPLIED, APPLICANT_STATES.INTERVIEWING, APPLICANT_STATES.HIRED];

class App extends Component {
  state = {
    filter: {
      name: localStorage.getItem('nameFilter') || null,
      city: localStorage.getItem('cityFilter') || null,
    },
    applicants: {
      loading: false,
      data: null,
      error: null,
    },
  };

  componentDidMount() {
    this.setState(previousState => ({
      applicants: {
        ...previousState.applicants,
        loading: true,
      },
    }));

    fetch('https://randomuser.me/api/?nat=gb&results=5')
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
  }

  getDashboardApplicants = () => {
    const applicants = Object.values(this.state.applicants.data);

    return applicants.reduce(
      (acc, applicant) => {
        if (
          (this.state.filter.name === null && this.state.filter.city === null) ||
          (this.state.filter.name && applicant.name.first.indexOf(this.state.filter.name) !== -1) ||
          (this.state.filter.name && applicant.name.last.indexOf(this.state.filter.name) !== -1) ||
          (this.state.filter.city && applicant.location.city.indexOf(this.state.filter.city) !== -1)
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

  handleApplicantStateChange = (uuid, newState) => {
    this.setState(prevState => {
      const data = {
        ...prevState.applicants.data,
        [uuid]: {
          ...prevState.applicants.data[uuid],
          state: newState,
        },
      };

      return {
        applicants: {
          ...prevState.applicants,
          data,
        },
      };
    });
  };

  render() {
    if (this.state.applicants.data) {
      const dashboardApplicants = this.getDashboardApplicants();
      console.log(dashboardApplicants);

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">OpenOceanStudio: Crew Applications</h1>
          </header>
          <div className="filter">
            <div>Name</div>
            <div>
              <input
                type="text"
                value={this.state.filter.name}
                onChange={({ target: { value } }) => {
                  localStorage.setItem('nameFilter', value);

                  return this.setState(prevState => ({
                    filter: {
                      ...prevState.filter,
                      name: value || null,
                    },
                  }));
                }}
              />
            </div>
            <div>Country</div>
            <div>
              <input
                type="text"
                value={this.state.filter.city}
                onChange={({ target: { value } }) => {
                  localStorage.setItem('cityFilter', value);

                  return this.setState(prevState => ({
                    filter: {
                      ...prevState.filter,
                      city: value || null,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <div className="dashboard">
            {DASHBOARD_COLUMNS.map((column, index) => (
              <div className="dashboard__column" key={column}>
                <div>{column}</div>
                {dashboardApplicants[column].map(applicant => (
                  <div key={applicant.login.uuid}>
                    <div>
                      <div>
                        applicant {applicant.name.first} {applicant.name.last} {applicant.location.city}
                      </div>
                    </div>
                    <div>
                      {DASHBOARD_COLUMNS[index - 1] && (
                        <button
                          type="button"
                          onClick={() => {
                            this.handleApplicantStateChange(applicant.login.uuid, DASHBOARD_COLUMNS[index - 1]);
                          }}
                        >
                          rev
                        </button>
                      )}

                      {DASHBOARD_COLUMNS[index + 1] && (
                        <button
                          type="button"
                          onClick={() => {
                            this.handleApplicantStateChange(applicant.login.uuid, DASHBOARD_COLUMNS[index + 1]);
                          }}
                        >
                          ff
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default App;
