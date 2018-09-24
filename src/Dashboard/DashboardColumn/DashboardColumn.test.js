import React from 'react';
import { shallow } from 'enzyme';
import DashboardColumn from './DashboardColumn';

jest.mock('../DashboardCell', () => 'DashboardCell');

const applicants = [
  {
    login: {
      uuid: '5d204000-387b-4741-8ba9-7c121ae6adab',
    },
  },
  {
    login: {
      uuid: '40fdd877-b7f1-47bd-8c6b-8b2129bbf3fd',
    },
  },
  {
    login: {
      uuid: '674ed62e-a5f2-42a1-9ba8-2c00c3671801',
    },
  },
];

const columnName = 'Test name';

it('Renders dashboard column', () => {
  expect(shallow(<DashboardColumn applicants={applicants} columnName={columnName} />)).toMatchSnapshot();
});

it('Renders empty dashboard column', () => {
  expect(shallow(<DashboardColumn applicants={[]} columnName={columnName} />)).toMatchSnapshot();
});
