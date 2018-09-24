import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import { APPLICANT_STATES } from '../constants';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

jest.mock('./DashboardColumn', () => 'DashboardColumn');

const applicants = {
  results: [
    {
      location: {
        city: 'bath',
      },
      name: {
        first: 'francis',
        last: 'stewart',
        title: 'mr',
      },
      login: {
        uuid: '5d204000-387b-4741-8ba9-7c121ae6adab',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/15.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/15.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/15.jpg',
      },
    },
    {
      location: {
        city: 'nottingham',
      },
      name: {
        first: 'harvey',
        last: 'clarke',
        title: 'mr',
      },
      login: {
        uuid: '40fdd877-b7f1-47bd-8c6b-8b2129bbf3fd',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/15.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/15.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/15.jpg',
      },
    },
    {
      location: {
        city: 'coventry',
      },
      name: {
        first: 'mia',
        last: 'white',
        title: 'mr',
      },
      login: {
        uuid: '674ed62e-a5f2-42a1-9ba8-2c00c3671801',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/15.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/15.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/15.jpg',
      },
    },
  ],
};

let storeMock = {};
const localStorageMock = (() => ({
  getItem(key) {
    return storeMock[key] || null;
  },
  setItem(key, value) {
    storeMock[key] = value.toString();
  },
  removeItem(key) {
    delete storeMock[key];
  },
  clear() {
    storeMock = {};
  },
}))();

const fetchSuccess = jest.fn().mockImplementation(
  () =>
    new Promise(resolve => {
      resolve({
        json: () => applicants,
      });
    })
);

const fetchError = jest.fn().mockImplementation(
  () =>
    new Promise((resolve, reject) => {
      reject(new Error('Network error'));
    })
);

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

it('Renders dashboard in Loading state', async () => {
  const component = shallow(<Dashboard />);
  expect(component).toMatchSnapshot();
});

it('Renders dashboard with error', async () => {
  global.fetch = fetchError;
  const component = shallow(<Dashboard />);
  await sleep(100);

  expect(component).toMatchSnapshot();
});

it('Renders dashboard with loaded data', async () => {
  global.fetch = fetchSuccess;

  const handleApplicantStateChangeMock = jest.fn();

  const component = shallow(<Dashboard />);
  component.instance().handleApplicantStateChange = handleApplicantStateChangeMock;
  await sleep(100);

  expect(component).toMatchSnapshot();

  expect(handleApplicantStateChangeMock.mock.calls.length).toBe(4);

  expect(handleApplicantStateChangeMock.mock.calls[0][0]).toBe(APPLICANT_STATES.INTERVIEWING);
  expect(handleApplicantStateChangeMock.mock.calls[1][0]).toBe(APPLICANT_STATES.HIRED);
  expect(handleApplicantStateChangeMock.mock.calls[2][0]).toBe(APPLICANT_STATES.APPLIED);
  expect(handleApplicantStateChangeMock.mock.calls[3][0]).toBe(APPLICANT_STATES.INTERVIEWING);
});

it('Renders dashboard and move applicant between columns', async () => {
  global.fetch = fetchSuccess;

  const component = shallow(<Dashboard />);
  await sleep(100);

  component.instance().handleApplicantStateChange(APPLICANT_STATES.INTERVIEWING)(applicants.results[0].login.uuid);
  expect(component).toMatchSnapshot();

  component.instance().handleApplicantStateChange(APPLICANT_STATES.HIRED)(applicants.results[0].login.uuid);
  expect(component).toMatchSnapshot();

  component.instance().handleApplicantStateChange(APPLICANT_STATES.APPLIED)(applicants.results[0].login.uuid);
  expect(component).toMatchSnapshot();
});

describe('Renders dashboard and filters applicants', () => {
  let component;

  beforeAll(async () => {
    global.fetch = fetchSuccess;
    component = shallow(<Dashboard />);

    await sleep(100);
  });

  it('Filter by name and country', () => {
    const nameValue = 'fr';
    const cityValue = 'ba';

    component.find('#nameInput').simulate('change', { target: { value: nameValue } });
    expect(component).toMatchSnapshot();

    component.find('#cityInput').simulate('change', { target: { value: cityValue } });
    expect(component).toMatchSnapshot();

    expect(storeMock.nameFilter).toBe(nameValue);
    expect(storeMock.cityFilter).toBe(cityValue);
  });

  it('Resets filters', async () => {
    const nameValue = '';
    const cityValue = '';

    component.find('#nameInput').simulate('change', { target: { value: nameValue } });
    expect(component).toMatchSnapshot();

    component.find('#cityInput').simulate('change', { target: { value: cityValue } });
    expect(component).toMatchSnapshot();

    expect(storeMock.nameFilter).toBe(nameValue);
    expect(storeMock.cityFilter).toBe(cityValue);
  });
});
