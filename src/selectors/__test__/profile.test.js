import * as ormUtils from 'models/__test__/utils';
import { selectProfile } from '../profile';

jest.mock('models/orm', () => {
  var ormUtils = require('models/__test__/utils');
  return ormUtils.buildOrmFor('user', 'profile', 'email', 'tag');
});

let orm = ormUtils.getOrm();
let ormSession;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
});

test('it should return current profile along with user', () => {
  const profile = ormUtils.createProfile(ormSession, true);
  const user = ormUtils.createUser(ormSession);
  profile.set('user', user);

  const selectedProfile = selectProfile({ db: ormSession.state });

  expect(ormSession.profile.count()).toEqual(1);
  expect(selectedProfile.id).toEqual(profile.id);
  expect(selectedProfile.user).toEqual(user.id);
});
