import orm from 'models/orm';
import nanoid from 'nanoid';

export default (function bootStrap() {
  const emptyDBState = orm.getEmptyState();
  const session = orm.session(emptyDBState);

  const { user, profile } = session;

  const cachedProfile = window.localStorage.getItem('cachedProfile');
  const cachedProfileUser = window.localStorage.getItem('cachedProfileUser');

  if (cachedProfile && cachedProfileUser) {
    user.create(JSON.parse(cachedProfileUser));
    profile.create(JSON.parse(cachedProfile));
  } else {
    profile.create({ id: nanoid(), isAuthenticated: false });
  }

  return session.state;
})();
