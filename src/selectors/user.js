import { createSelector } from 'redux-orm';
import orm from 'models/orm';

const selectUsers = createSelector(
  orm,
  state => state.db,
  session => {
    return session.user.all().toRefArray();
  }
);

const selectUser = (state, userId) => {
  const allUsres = selectUsers(state);
  return allUsres.find(user => user.id === userId);
};

export { selectUsers, selectUser };
