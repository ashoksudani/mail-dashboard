import { Model, attr, fk, many } from 'redux-orm';
import * as actionList from 'constants/actions';

class Email extends Model {}
Email.modelName = 'email';
Email.fields = {
  id: attr(),
  to: many('user', 'toEmails'),
  cc: many('user', 'ccEmails'),
  from: fk('user', 'fromEmail'),
  subject: attr(),
  body: attr(),
  creationTime: attr()
};
Email.reducer = function(action, Email, session) {
  switch (action.type) {
    case actionList.SEND_EMAIL_SUCCESS:
      const { email, user } = action.payload.response;
      const emailItem = Email.create(email);
      emailItem.from.update(user);
      break;
    default:
      break;
  }
  return undefined;
};

export default Email;
