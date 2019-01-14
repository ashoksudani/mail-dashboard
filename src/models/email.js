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
  creationTime: attr({ getDefault: () => new Date().getTime() }),
  tags: many('tag', 'tagEmails'),
  unread: attr({ getDefault: () => true })
};
Email.reducer = function(action, Email, session) {
  switch (action.type) {
    case actionList.MAIL_AGGREGATE_SUCCESS:
      action.payload.response.emails.forEach(email => {
        Email.create(email);
      });
      break;
    case actionList.MARK_EMAIL_SUCCESS:
      action.payload.response.emails.forEach(email => {
        Email.withId(email.id).update(email);
      });
      break;
    case actionList.SEND_EMAIL_SUCCESS:
      const { email } = action.payload.response;
      Email.create(email);
      break;
    default:
      break;
  }
  return undefined;
};

export default Email;
