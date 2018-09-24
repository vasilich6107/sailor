import React from 'react';
import DashboardCell from '../DashboardCell';

import './DashboardColumn.css';

const DashboardColumn = ({ columnName, applicants, ...props }) => (
  <div className="dashboard__column">
    <div className="dashboard__column-title">{columnName}</div>
    <div className="dashboard__column-content">
      {applicants.map(applicant => (
        <DashboardCell key={applicant.login.uuid} applicant={applicant} {...props} />
      ))}
    </div>
  </div>
);

export default DashboardColumn;
