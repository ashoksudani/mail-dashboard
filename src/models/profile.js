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
  switch (action.type) {
    case actionList.LOGIN_SUCCESS:
      const profileUser = session.user.create(action.payload.response);
      const profile = session.profile.first();
      profile.set('user', profileUser);
      profile.set('isAuthenticated', true);
      window.localStorage.setItem('cachedProfile', JSON.stringify(profile.ref));
      window.localStorage.setItem(
        'cachedProfileUser',
        JSON.stringify(profileUser.ref)
      );
      break;
    default:
      break;
  }
  return undefined;
};

export default Profile;
