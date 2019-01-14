import React from 'react';
import { Login } from '../login';
import { Redirect, MemoryRouter } from 'react-router-dom';

const defaultProps = {
  createLoginRequest: jest.fn(),
  profile: { isAuthenticated: false },
  isLoading: false,
  errorMessage: []
};

let componentWrapper;
beforeEach(() => {
  componentWrapper = mount(
    <MemoryRouter initialEntries={['/test-route']} initialIndex={0}>
      <Login {...defaultProps} />
    </MemoryRouter>
  );
});

test('should render login form when profile is not authenticated', () => {
  expect(componentWrapper).toMatchSnapshot();

  expect(componentWrapper.find('input[name="emailId"]').length).toEqual(1);
  expect(componentWrapper.find('input[name="password"]').length).toEqual(1);
  expect(componentWrapper.find('button[type="submit"]').length).toEqual(1);
});

test('it should show possible errors if user submit form without entering any value', () => {
  componentWrapper.find('form').simulate('submit');
  const LoginComponent = componentWrapper.find(Login);
  expect(LoginComponent.state().error).toEqual({
    emailId: true,
    password: true
  });
});

/*
test('should redirect to mail route when profile is authenticated', () => {
  const LoginComponent = componentWrapper.find(Login);
  componentWrapper.setProps({
    children: cloneElement(wrapper.props().children, {
      profile: { isAuthenticated: true }
    })
  });

  expect(componentWrapper.find(Redirect).length).toEqual(1);
  expect(componentWrapper.find(Redirect).props().to).toEqual('/mail');
});
*/
