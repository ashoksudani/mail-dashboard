import { Model, attr, oneToOne } from 'redux-orm';
import * as actionList from 'constants/actions';

class Profile extends Model {}
Profile.modelName = 'profile';
Profile.fields = {
  id: attr(),
  user: oneToOne('user', 'profile'),
  isAuthenticated: attr(false)
};
Profile.reducer = function(action, Profile, session) {
  let profile;

  switch (action.type) {
    case actionList.LOGIN_SUCCESS:
      session.email.all().delete();
      session.user.all().delete();

      const profileUser = session.user.create(action.payload.response);
      profile = session.profile.first();

      profile.set('user', profileUser);
      profile.set('isAuthenticated', true);

      window.localStorage.setItem('cachedProfile', JSON.stringify(profile.ref));
      window.localStorage.setItem(
        'cachedProfileUser',
        JSON.stringify(profileUser.ref)
      );
      break;

    case actionList.LOGOUT_SUCCESS:
      profile = session.profile.first();

      session.email.all().delete();
      profile.user.delete();
      session.user.all().delete();

      profile.set('isAuthenticated', false);

      window.localStorage.removeItem('cachedProfile');
      window.localStorage.removeItem('cachedProfileUser');
      break;
    default:
      break;
  }
  return undefined;
};

export default Profile;
