import React from 'react';
import { shallow } from 'enzyme';
import DashboardFilter from './DashboardFilter';

it('Renders filter with empty initial values', () => {
  const handleFilterChange = jest.fn().mockImplementation(() => jest.fn());

  const emptyInitialValues = {
    name: '',
    city: '',
  };
  expect(
    shallow(<DashboardFilter initialValues={emptyInitialValues} onFilterChange={handleFilterChange} />)
  ).toMatchSnapshot();

  expect(handleFilterChange.mock.calls.length).toBe(2);
  expect(handleFilterChange.mock.calls[0][0]).toBe('name');
  expect(handleFilterChange.mock.calls[1][0]).toBe('city');
});

it('Renders filter with prefilled initial values', () => {
  const handleFilterChange = jest.fn().mockImplementation(() => jest.fn());

  const prefilledInitialValues = {
    name: 'some',
    city: 'city',
  };
  expect(
    shallow(<DashboardFilter initialValues={prefilledInitialValues} onFilterChange={handleFilterChange} />)
  ).toMatchSnapshot();

  expect(handleFilterChange.mock.calls.length).toBe(2);
  expect(handleFilterChange.mock.calls[0][0]).toBe('name');
  expect(handleFilterChange.mock.calls[1][0]).toBe('city');
});

it('Renders filter and calls the onChange function', () => {
  const inputOnChange = jest.fn();
  const handleFilterChange = jest.fn().mockImplementation(() => inputOnChange);

  const emptyInitialValues = {
    name: '',
    city: '',
  };

  const component = shallow(<DashboardFilter initialValues={emptyInitialValues} onFilterChange={handleFilterChange} />);
  expect(component).toMatchSnapshot();

  const nameValue = { target: { value: 'fr' } };
  const cityValue = { target: { value: 'ba' } };

  component.find('#nameInput').simulate('change', nameValue);
  expect(component).toMatchSnapshot();

  expect(inputOnChange.mock.calls.length).toBe(1);
  expect(inputOnChange.mock.calls[0][0]).toBe(nameValue);

  component.find('#cityInput').simulate('change', cityValue);
  expect(component).toMatchSnapshot();

  expect(inputOnChange.mock.calls.length).toBe(2);
  expect(inputOnChange.mock.calls[1][0]).toBe(cityValue);
});
