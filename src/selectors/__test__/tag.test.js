import * as ormUtils from 'models/__test__/utils';
import * as tagSelector from '../tag';

jest.mock('models/orm', () => {
  var ormUtils = require('models/__test__/utils');
  return ormUtils.buildOrmFor('tag');
});

let orm = ormUtils.getOrm();
let ormSession;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
});

test('it should return tag according to selector function', () => {
  const inboxTag = ormUtils.createTag(ormSession, { label: 'inbox' });
  const sentTag = ormUtils.createTag(ormSession, { label: 'sent' });
  const trashTag = ormUtils.createTag(ormSession, { label: 'trash' });

  const allTags = tagSelector.selectAllTags({ db: ormSession.state });
  const selectedInboxTag = tagSelector.selectInboxTag({ db: ormSession.state });
  const selectedSentTag = tagSelector.selectSentTag({ db: ormSession.state });
  const selectedTrashTag = tagSelector.selectTrashTag({ db: ormSession.state });

  expect(allTags.length).toEqual(3);
  expect(selectedInboxTag.id).toEqual(inboxTag.id);
  expect(selectedSentTag.id).toEqual(sentTag.id);
  expect(selectedTrashTag.id).toEqual(trashTag.id);
});
