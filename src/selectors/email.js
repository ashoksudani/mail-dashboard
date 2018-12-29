import { createSelector } from 'redux-orm';
import orm from 'models/orm';

import { selectUser } from 'selectors/user';

const selectAllEmails = createSelector(
  orm,
  state => state.db,
  session => {
    return session.email.all().toRefArray();
  }
);

const selectEmails = (state, userId, filter) => {
  const user = selectUser(state, userId);
  const allEmails = selectAllEmails(state);

  switch (filter) {
    case 'inbox':
      return selectInbox(allEmails, user);
    case 'sent':
      return selectSent(allEmails, user);
    case 'trash':
      return selectTrash(allEmails, user);
    default:
      return [];
  }
};
const selectInbox = (allEmails, user) => {
  return [...user.unreadEmails, ...user.readEmails].map(
    emailId => allEmails[emailId]
  );
};
const selectSent = (allEmails, user) => {
  return user.sentEmails.map(emailId => allEmails[emailId]);
};
const selectTrash = (allEmails, user) => {
  return user.deletedEmails.map(emailId => allEmails[emailId]);
};

export { selectEmails };
