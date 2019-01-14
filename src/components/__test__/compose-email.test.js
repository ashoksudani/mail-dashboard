import React from 'react';
import { ComposeEmail } from '../compose-email';
import { Dropdown } from 'semantic-ui-react';

let componentWrapper;
const defaultProps = {
  open: true,
  onClose: jest.fn(),
  onSendEmail: jest.fn(),
  users: [{ id: 1, emailId: 'user1@email.com' }],
  profile: { user: 1 }
};

beforeEach(() => {
  componentWrapper = mount(<ComposeEmail {...defaultProps} />);
});

test('it renders with a correct html elements', () => {
  expect(componentWrapper.find('div[className="header"]').text()).toEqual(
    'New message'
  );
  expect(componentWrapper.find('div[name="to"] input').length).toEqual(1);
  expect(componentWrapper.find('div[name="cc"] input').length).toEqual(1);
  expect(componentWrapper.find('input[name="subject"]').length).toEqual(1);
  expect(componentWrapper.find('button[name="cancel"]').length).toEqual(1);
  expect(componentWrapper.find('button[name="send"]').length).toEqual(1);
});

test('it should show reset state and call onClose handler when closing form', () => {
  const spyResetState = jest.spyOn(componentWrapper.instance(), 'resetState');

  componentWrapper.find('button[name="cancel"]').simulate('click');

  expect(defaultProps.onClose).toHaveBeenCalled();
  expect(spyResetState).toHaveBeenCalled();
});

test('it should show possible errors if user submit form without entering any value', () => {
  componentWrapper.find('button[name="send"]').simulate('click');
  expect(componentWrapper.state().error).toEqual({
    to: true,
    subject: true
  });
});

/*
test('it should submit form with entered value, reset state and close dialoge', () => {
  componentWrapper
    .find('div[name="to"] input')
    .simulate('change', { target: { name: 'to', value: 1 } });
  componentWrapper.find('input[name="subject"]').simulate('change', {
    target: { name: 'subject', value: 'test subject value' }
  });

  componentWrapper.find('button[name="send"]').simulate('click');

  expect(defaultProps.onSendEmail).toHaveBeenCalled();
  expect(defaultProps.onClose).toHaveBeenCalled();
  expect(componentWrapper.state().to).toEqual({
    form: { description: '', amount: '', paidBy: '' },
    error: {}
  });
});
*/
