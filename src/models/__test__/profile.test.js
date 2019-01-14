import * as ormUtils from './utils';
import * as actions from 'actions';

let orm = ormUtils.buildOrmFor('email', 'user', 'tag', 'profile');
let ormSession;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
});

test('it should clear data, update profile and add user for login success', () => {
  //Create action
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);

  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);

  ormUtils.createProfile(ormSession, false);
  const userObj = ormUtils.getSampleUserObj();

  const actionCreated = actions.createLoginSuccess(userObj);

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(0);
  expect(newSession.profile.count()).toEqual(1);
  expect(newSession.user.count()).toEqual(1);

  expect(newSession.profile.at(0).user.ref.id).toEqual(userObj.id);
  expect(newSession.profile.at(0).ref.isAuthenticated).toEqual(true);
});

test('it should clear data, update profile and add user for logout success', () => {
  //Create action
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);

  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);

  const profile = ormUtils.createProfile(ormSession, false);
  const user = ormUtils.createUser(ormSession);

  profile.set('user', user);

  const actionCreated = actions.createLogoutSuccess();

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.email.count()).toEqual(0);
  expect(newSession.profile.count()).toEqual(1);
  expect(newSession.user.count()).toEqual(0);

  expect(newSession.profile.at(0).user).toBeNull();
  expect(newSession.profile.at(0).ref.isAuthenticated).toEqual(false);
});
