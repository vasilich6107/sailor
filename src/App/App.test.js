import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('Renders main app with dashboard', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
