import * as ormUtils from 'models/__test__/utils';
import { selectAllUsers, selectUser } from '../user';

jest.mock('models/orm', () => {
  var ormUtils = require('models/__test__/utils');
  return ormUtils.buildOrmFor('user', 'profile', 'email', 'tag');
});

let orm = ormUtils.getOrm();
let ormSession;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
});

test('it should return users for selector function', () => {
  ormUtils.createUser(ormSession);
  const user2 = ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);
  ormUtils.createUser(ormSession);

  const allUser = selectAllUsers({ db: ormSession.state });
  const particularUser = selectUser({ db: ormSession.state }, user2.id);

  expect(allUser.length).toEqual(4);
  expect(particularUser.id).toEqual(user2.id);
});
