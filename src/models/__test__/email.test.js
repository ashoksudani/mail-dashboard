import * as ormUtils from './utils';
import * as actions from 'actions';

jest.mock('models/user', () => {
  const Model = require('redux-orm').Model;
  class User extends Model {}
  User.modelName = 'user';
  return User;
});

jest.mock('models/tag', () => {
  const Model = require('redux-orm').Model;
  class Tag extends Model {}
  Tag.modelName = 'tag';
  return Tag;
});

let orm = ormUtils.buildOrmFor('email', 'user', 'tag', 'profile');
let ormSession;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
});

test('it should create emails retrieved from mail aggregate action', () => {
  //Create action
  const firstEmail = ormUtils.getSampleEmailObj();
  const secondEmail = ormUtils.getSampleEmailObj();
  const mailAggregatePayload = {
    emails: [firstEmail, secondEmail],
    contacts: [],
    profileUser: { id: 1 }
  };

  const actionCreated = actions.createMailAggregateSuccess(
    mailAggregatePayload
  );

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(2);
  expect(firstEmail).toEqual(
    expect.objectContaining(newSession.email.at(0).ref)
  );
  expect(secondEmail).toEqual(
    expect.objectContaining(newSession.email.at(1).ref)
  );
});

test('it should mark email as unread for mark email action', () => {
  //Create action
  const firstEmail = ormUtils.createEmail(ormSession);

  const actionCreated = actions.createMarkEmailSuccess({
    emails: [Object.assign(firstEmail.ref, { unread: true })]
  });

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(1);
  expect(newSession.email.at(0).ref.unread).toEqual(true);
});

test('it should mark email as read for mark email action', () => {
  //Create action
  const firstEmail = ormUtils.createEmail(ormSession);

  const actionCreated = actions.createMarkEmailSuccess({
    emails: [Object.assign(firstEmail.ref, { unread: false })]
  });

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(1);
  expect(newSession.email.at(0).ref.unread).toEqual(false);
});

test('it should create a new email for send email success', () => {
  //Create action
  const firstEmail = ormUtils.getSampleEmailObj();

  const actionCreated = actions.createSendEmailSuccess({
    email: firstEmail
  });

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(1);
  expect(firstEmail).toEqual(
    expect.objectContaining(newSession.email.at(0).ref)
  );
});
