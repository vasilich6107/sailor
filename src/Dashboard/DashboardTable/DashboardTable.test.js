import React from 'react';
import { shallow } from 'enzyme';
import DashboardTable from './DashboardTable';
import { APPLICANT_STATES } from '../../constants';

jest.mock('../DashboardColumn', () => 'DashboardColumn');

const applicants = {
  [APPLICANT_STATES.APPLIED]: [
    {
      name: {
        first: 'francis',
        last: 'stewart',
        title: 'mr',
      },
    },
  ],
  [APPLICANT_STATES.INTERVIEWING]: [
    {
      name: {
        first: 'harvey',
        last: 'clarke',
        title: 'mr',
      },
    },
  ],
  [APPLICANT_STATES.HIRED]: [
    {
      name: {
        first: 'mia',
        last: 'white',
        title: 'mr',
      },
    },
  ],
};

export const DASHBOARD_COLUMNS = [APPLICANT_STATES.APPLIED, APPLICANT_STATES.INTERVIEWING, APPLICANT_STATES.HIRED];

it('Renders dashboard column', () => {
  const handleStateChange = jest.fn().mockImplementation(() => () => {});

  expect(
    shallow(
      <DashboardTable columnOrder={DASHBOARD_COLUMNS} applicants={applicants} onStateChange={handleStateChange} />
    )
  ).toMatchSnapshot();

  expect(handleStateChange.mock.calls.length).toBe(4);
  expect(handleStateChange.mock.calls[0][0]).toBe(APPLICANT_STATES.INTERVIEWING);
  expect(handleStateChange.mock.calls[1][0]).toBe(APPLICANT_STATES.HIRED);
  expect(handleStateChange.mock.calls[2][0]).toBe(APPLICANT_STATES.APPLIED);
  expect(handleStateChange.mock.calls[3][0]).toBe(APPLICANT_STATES.INTERVIEWING);
});
