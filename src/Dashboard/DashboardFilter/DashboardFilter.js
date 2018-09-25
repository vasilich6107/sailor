// @flow
import React from 'react';
import './DashboardFilter.css';
import type { DashboardFilterType } from '../../types/Dashboard';

type Props = {
  initialValues: DashboardFilterType,
  onFilterChange: (name: string) => (e: SyntheticInputEvent<HTMLInputElement>) => {},
};

const DashboardFilter = ({ initialValues, onFilterChange }: Props) => (
  <div className="filter">
    <div className="filter__item">
      <div>Name</div>
      <div>
        <input
          id="nameInput"
          type="text"
          placeholder="First or Last name"
          value={initialValues.name}
          onChange={onFilterChange('name')}
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
          value={initialValues.city}
          onChange={onFilterChange('city')}
        />
      </div>
    </div>
  </div>
);

export default DashboardFilter;
