import React from 'react';
import { shallow } from 'enzyme';
import DashboardCell from './DashboardCell';

const applicant = {
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
};

it('Renders dashboard cell', () => {
  expect(shallow(<DashboardCell applicant={applicant} />)).toMatchSnapshot();
});

it('Renders dashboard cell with "previous" button', () => {
  const rev = jest.fn();
  const component = shallow(<DashboardCell applicant={applicant} onPrevious={rev} />);
  expect(component).toMatchSnapshot();

  component.find('#previous').simulate('click');
  expect(rev.mock.calls.length).toBe(1);
  expect(rev.mock.calls[0][0]).toBe(applicant.login.uuid);
});

it('Renders dashboard cell with "next" button', () => {
  const ff = jest.fn();
  const component = shallow(<DashboardCell applicant={applicant} onNext={ff} />);
  expect(component).toMatchSnapshot();

  component.find('#next').simulate('click');
  expect(ff.mock.calls.length).toBe(1);
  expect(ff.mock.calls[0][0]).toBe(applicant.login.uuid);
});

it('Renders dashboard cell with both buttons', () => {
  const rev = jest.fn();
  const ff = jest.fn();
  expect(shallow(<DashboardCell applicant={applicant} onNext={ff} onPrevious={rev} />)).toMatchSnapshot();
});
