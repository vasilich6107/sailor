import React from 'react';

import './DashboardCell.css';

const DashboardCell = ({ applicant, rev, ff }) => (
  <div className="dashboard__cell">
    <div className="applicant">
      <div className="applicant__picture">
        <img src={applicant.picture.medium} alt={applicant.name.first} />
      </div>
      <div className="applicant__data">
        <div>First name: {applicant.name.first}</div>
        <div>Last name: {applicant.name.last}</div>
        <div>Country: {applicant.location.city}</div>
      </div>
    </div>
    <div className="dashboard__cell-controls">
      <div>
        {rev && (
          <button type="button" onClick={() => rev(applicant.login.uuid)}>
            &#8249;
          </button>
        )}
      </div>

      <div>
        {ff && (
          <button type="button" onClick={() => ff(applicant.login.uuid)}>
            &#8250;
          </button>
        )}
      </div>
    </div>
  </div>
);

export default DashboardCell;
