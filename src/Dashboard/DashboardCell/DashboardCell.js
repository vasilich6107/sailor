import React from 'react';

import './DashboardCell.css';

const DashboardCell = ({ applicant, onPrevious, onNext }) => (
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
        {onPrevious && (
          <button id="previous" type="button" onClick={() => onPrevious(applicant.login.uuid)}>
            &#8249;
          </button>
        )}
      </div>

      <div>
        {onNext && (
          <button id="next" type="button" onClick={() => onNext(applicant.login.uuid)}>
            &#8250;
          </button>
        )}
      </div>
    </div>
  </div>
);

export default DashboardCell;
