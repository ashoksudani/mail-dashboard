import { Model, attr, many } from 'redux-orm';
import * as actionList from 'constants/actions';

class User extends Model {}
User.modelName = 'user';
User.fields = {
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  emailId: attr(),
  emails: many('email', 'emailsUser'),
  contacts: many('user', 'contactsUser')
};
User.reducer = function(action, User, session) {
  switch (action.type) {
    case actionList.MAIL_AGGREGATE_SUCCESS:
      action.payload.response.contacts.forEach(user => {
        User.create(user);
      });
      const profileUser = action.payload.response.profileUser;
      User.withId(profileUser.id).update(profileUser);
      break;
    case actionList.SEND_EMAIL_SUCCESS:
      const { user } = action.payload.response;
      User.withId(user.id).update(user);
      break;
    default:
      break;
  }
  return undefined;
};

export default User;
