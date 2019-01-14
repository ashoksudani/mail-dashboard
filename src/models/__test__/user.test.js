import * as ormUtils from './utils';
import * as actions from 'actions';

jest.mock('models/email', () => {
  const Model = require('redux-orm').Model;
  class Email extends Model {}
  Email.modelName = 'email';
  return Email;
});

jest.mock('models/tag', () => {
  const Model = require('redux-orm').Model;
  class Tag extends Model {}
  Tag.modelName = 'tag';
  return Tag;
});

let orm = ormUtils.buildOrmFor('email', 'user', 'tag', 'profile');
let ormSession;
let profile;
let profileUser;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
  profile = ormUtils.createProfile(ormSession, false);
  profileUser = ormUtils.createUser(ormSession);
  profile.set('user', profileUser);
});

test('it should create users retrieved as contacts from mail aggregate action', () => {
  const User1 = ormUtils.getSampleUserObj();
  const User2 = ormUtils.getSampleUserObj();
  const UserEmail = ormUtils.createEmail(ormSession);

  const mailAggregatePayload = {
    emails: [],
    contacts: [User1, User2],
    profileUser: Object.assign({}, profileUser.ref, { emails: [UserEmail.id] })
  };

  const actionCreated = actions.createMailAggregateSuccess(
    mailAggregatePayload
  );

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.user.count()).toEqual(3);
  expect(newSession.profile.first().user.emails.toRefArray()[0].id).toEqual(
    UserEmail.id
  );
});

test('it should create a new email for send email success', () => {
  const UserEmail = ormUtils.createEmail(ormSession);
  const mailSendSuccessPayload = {
    user: Object.assign({}, profileUser.ref, { emails: [UserEmail.id] })
  };

  const actionCreated = actions.createSendEmailSuccess(mailSendSuccessPayload);

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(1);
  expect(newSession.profile.first().user.emails.toRefArray()[0].id).toEqual(
    UserEmail.id
  );
});
