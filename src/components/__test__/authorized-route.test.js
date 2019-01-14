import React from 'react';
import { AuthorizedRoute } from '../authorized-route';
import { Redirect, MemoryRouter } from 'react-router-dom';

test('renders passed component of route if profile is authenticated', () => {
  const SampleComp = () => <div id="sample-div">Sample Div</div>;
  const props = {
    component: SampleComp,
    path: '/login',
    profile: { isAuthenticated: true }
  };

  const rootWrapper = mount(
    <MemoryRouter initialEntries={['/login']} initialIndex={0}>
      <AuthorizedRoute {...props} />
    </MemoryRouter>
  );

  expect(rootWrapper).toMatchSnapshot();

  expect(rootWrapper.find('div[id="sample-div"]').length).toEqual(1);
});

test('renders passed component of route if profile is not authenticated', () => {
  const SampleComp = () => <div id="sample-div">Sample Div</div>;
  const props = {
    component: SampleComp,
    path: '/mail',
    profile: { isAuthenticated: false }
  };

  const rootWrapper = shallow(
    <MemoryRouter initialEntries={['/mail']} initialIndex={0}>
      <AuthorizedRoute {...props} />
    </MemoryRouter>
  );
  expect(rootWrapper.html()).toEqual('');
});
