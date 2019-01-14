import { createSelector } from 'redux-orm';
import orm from 'models/orm';

import * as tagSelector from 'selectors/tag';

const selectAllEmails = createSelector(
  orm,
  state => state.db,
  session => {
    const emails = session.profile
      .first()
      .user.emails.all()
      .toModelArray()
      .map(email => {
        return Object.assign({}, email.ref, {
          to: email.to.toRefArray(),
          cc: email.cc.toRefArray(),
          tags: email.tags.toRefArray(),
          tagIds: email.tags.toRefArray().map(tag => tag.id),
          from: email.from.ref
        });
      });
    return emails.sort((a, b) => b.creationTime - a.creationTime);
  }
);

const selectEmails = (state, filter) => {
  const allEmails = selectAllEmails(state);
  const trashTag = tagSelector.selectTrashTag(state);

  switch (filter) {
    case 'sent':
      const sentTag = tagSelector.selectSentTag(state);
      return selectSent(state, allEmails, sentTag, trashTag);
    case 'trash':
      return selectTrash(state, allEmails, trashTag);
    case 'inbox':
    default:
      const inboxTag = tagSelector.selectInboxTag(state);
      return selectInbox(state, allEmails, inboxTag, trashTag);
  }
};

const selectInbox = (state, allEmails, inboxTag, trashTag) => {
  return allEmails.filter(
    email =>
      email.tagIds.includes(inboxTag.id) && !email.tagIds.includes(trashTag.id)
  );
};
const selectSent = (state, allEmails, sentTag, trashTag) => {
  return allEmails.filter(
    email =>
      email.tagIds.includes(sentTag.id) && !email.tagIds.includes(trashTag.id)
  );
};
const selectTrash = (state, allEmails, trashTag) => {
  return allEmails.filter(email => email.tagIds.includes(trashTag.id));
};

export { selectEmails };
