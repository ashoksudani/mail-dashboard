import React from 'react';
import Root from '../root';

test('renders with expected list of components', () => {
  const rootWrapper = mount(<Root />);

  expect(rootWrapper).toMatchSnapshot();

  //login form
  expect(rootWrapper.find('form').length).toEqual(1);
  expect(rootWrapper.find('input[name="emailId"]').length).toEqual(1);
  expect(rootWrapper.find('input[name="password"]').length).toEqual(1);
});
