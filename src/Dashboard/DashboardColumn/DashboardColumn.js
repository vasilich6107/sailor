// @flow
import React from 'react';
import DashboardCell from '../DashboardCell';
import type { ApplicantType } from '../../types/Applicant';

import './DashboardColumn.css';

type Props = {
  columnName: string,
  applicants: Array<ApplicantType>,
  onNext: string | ((uuid: string) => void),
  onPrevious: string | ((uuid: string) => void),
};

const DashboardColumn = ({ columnName, applicants, ...props }: Props) => (
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
