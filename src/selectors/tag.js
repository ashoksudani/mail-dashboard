import { createSelector } from 'redux-orm';
import orm from 'models/orm';

const selectAllTags = createSelector(
  orm,
  state => state.db,
  session => {
    return session.tag
      .all()
      .toModelArray()
      .map(tag => {
        return Object.assign({}, tag.ref);
      });
  }
);

const selectInboxTag = state => {
  return selectAllTags(state).find(tag => tag.label.toLowerCase() === 'inbox');
};

const selectSentTag = state => {
  return selectAllTags(state).find(tag => tag.label.toLowerCase() === 'sent');
};

const selectTrashTag = state => {
  return selectAllTags(state).find(tag => tag.label.toLowerCase() === 'trash');
};

export { selectAllTags, selectInboxTag, selectSentTag, selectTrashTag };
