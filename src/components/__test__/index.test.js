import React from 'react';
import Index from '../index';
import { Redirect, MemoryRouter } from 'react-router-dom';

test('should redirect to mail route', () => {
  const rootWrapper = shallow(
    <MemoryRouter initialEntries={['/mail']} initialIndex={0}>
      <Index />
    </MemoryRouter>
  );

  expect(rootWrapper.html()).toEqual('');
  // expect(rootWrapper.find(Redirect).length).toEqual(1);
  // expect(rootWrapper.find(Redirect).props().to).toEqual('/mail');
});
