import { Model, attr, many } from 'redux-orm';
import * as actionList from 'constants/actions';

class User extends Model {}
User.modelName = 'user';
User.fields = {
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  emailId: attr(),
  unreadEmails: many('email', 'unreadEmailsUser'),
  readEmails: many('email', 'readEmailsUser'),
  sentEmails: many('email', 'sentEmailsUser'),
  deletedEmails: many('email', 'deletedEmailsUser'),
  contacts: many('user', 'contactsUser')
};
User.reducer = function(action, User, session) {
  switch (action.type) {
    case actionList.MAIL_AGGREGATE_SUCCESS:
      action.payload.response.contacts.forEach(user => {
        User.create(user);
      });
      break;
    default:
      break;
  }
  return undefined;
};

export default User;
