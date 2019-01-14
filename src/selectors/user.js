import { createSelector } from 'redux-orm';
import orm from 'models/orm';

const selectAllUsers = createSelector(
  orm,
  state => state.db,
  session => {
    return session.user
      .all()
      .toModelArray()
      .map(user => {
        return Object.assign({}, user.ref, {
          emails: user.emails.toRefArray(),
          contacts: user.contacts.toRefArray()
        });
      });
  }
);

const selectUser = (state, userId) => {
  const allUsres = selectAllUsers(state);
  return allUsres.find(user => user.id === userId);
};

export { selectAllUsers, selectUser };
