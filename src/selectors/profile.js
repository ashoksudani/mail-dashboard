import { createSelector } from 'redux-orm';
import orm from 'models/orm';

const selectProfile = createSelector(
  orm,
  state => state.db,
  session => {
    return session.profile.first().ref;
  }
);

export { selectProfile };
