// @flow
import React from 'react';
import DashboardColumn from '../DashboardColumn/DashboardColumn';
import './DashboardTable.css';
import type { DashboardColumnsType } from '../../types/Dashboard';
import type { ApplicantType } from '../../types/Applicant';

type Props = {
  columnOrder: DashboardColumnsType,
  applicants: { [key: string]: Array<ApplicantType> },
  onStateChange: (newState: string) => (uuid: string) => void,
};

const DashboardTable = ({ columnOrder, applicants, onStateChange }: Props) => (
  <div className="dashboard">
    {columnOrder.map((column: string, index: number, source: DashboardColumnsType) => {
      const nextState: string = source[index + 1];
      const prevState: string = source[index - 1];

      return (
        <DashboardColumn
          key={column}
          columnName={column}
          applicants={applicants[column]}
          onNext={nextState && onStateChange(nextState)}
          onPrevious={prevState && onStateChange(prevState)}
        />
      );
    })}
  </div>
);

export default DashboardTable;
