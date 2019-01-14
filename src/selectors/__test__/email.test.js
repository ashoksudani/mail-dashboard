import * as ormUtils from 'models/__test__/utils';
import { selectEmails } from '../email';

jest.mock('models/orm', () => {
  var ormUtils = require('models/__test__/utils');
  return ormUtils.buildOrmFor('email', 'user', 'tag', 'profile');
});

let orm = ormUtils.getOrm();
let ormSession;
let user;
let sentTag;
let trashTag;
let inboxTag;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
  const profile = ormUtils.createProfile(ormSession, true);
  user = ormUtils.createUser(ormSession);
  profile.set('user', user);

  sentTag = ormUtils.createTag(ormSession, { label: 'sent' });
  inboxTag = ormUtils.createTag(ormSession, { label: 'inbox' });
  trashTag = ormUtils.createTag(ormSession, { label: 'trash' });
});

test('it should return all sent emails according to passed filter as "sent"', () => {
  const sentEmail1 = ormUtils.createEmail(ormSession, {
    tags: [sentTag.id],
    creationTime: new Date('1/1/2018').getTime()
  });
  const sentEmail2 = ormUtils.createEmail(ormSession, {
    tags: [sentTag.id, inboxTag.id],
    creationTime: new Date('1/2/2018').getTime()
  });

  ormUtils.createEmail(ormSession, { tags: [sentTag.id] });
  ormUtils.createEmail(ormSession);
  ormUtils.createEmail(ormSession);

  sentEmail1.set('from', user);
  sentEmail2.set('from', user);
  user.emails.add(sentEmail1);
  user.emails.add(sentEmail2);

  const sentEmails = selectEmails({ db: ormSession.state }, 'sent');

  expect(sentEmails.length).toEqual(2);
  expect(sentEmails[0].id).toEqual(sentEmail2.id);
  expect(sentEmails[1].id).toEqual(sentEmail1.id);
});

test('it should return all sent emails according to passed filter as "inbox"', () => {
  const inboxEmail1 = ormUtils.createEmail(ormSession, {
    tags: [inboxTag.id],
    creationTime: new Date('1/1/2018').getTime()
  });
  const inboxEmail2 = ormUtils.createEmail(ormSession, {
    tags: [inboxTag.id],
    creationTime: new Date('1/2/2018').getTime()
  });
  const inboxEmail3 = ormUtils.createEmail(ormSession, {
    tags: [inboxTag.id, sentTag.id],
    creationTime: new Date('1/3/2018').getTime()
  });

  ormUtils.createEmail(ormSession, { tags: [sentTag.id] });
  ormUtils.createEmail(ormSession, { tags: [sentTag.id] });

  inboxEmail1.set('from', user);
  inboxEmail2.set('from', user);
  inboxEmail3.set('from', user);
  user.emails.add(inboxEmail1);
  user.emails.add(inboxEmail2);
  user.emails.add(inboxEmail3);

  const inboxEmails = selectEmails({ db: ormSession.state }, 'inbox');

  expect(inboxEmails.length).toEqual(3);
  expect(inboxEmails[0].id).toEqual(inboxEmail3.id);
  expect(inboxEmails[1].id).toEqual(inboxEmail2.id);
  expect(inboxEmails[2].id).toEqual(inboxEmail1.id);
});

test('it should return all sent emails according to passed filter as "trash"', () => {
  const trashEmail1 = ormUtils.createEmail(ormSession, {
    tags: [trashTag.id],
    creationTime: new Date('1/1/2018').getTime()
  });
  const trashEmail2 = ormUtils.createEmail(ormSession, {
    tags: [inboxTag.id, trashTag.id],
    creationTime: new Date('1/13/2018').getTime()
  });

  ormUtils.createEmail(ormSession, { tags: [sentTag.id] });
  ormUtils.createEmail(ormSession, { tags: [sentTag.id] });

  trashEmail1.set('from', user);
  trashEmail2.set('from', user);
  user.emails.add(trashEmail1);
  user.emails.add(trashEmail2);

  const trashEmails = selectEmails({ db: ormSession.state }, 'trash');

  expect(trashEmails.length).toEqual(2);
  expect(trashEmails[0].id).toEqual(trashEmail2.id);
  expect(trashEmails[1].id).toEqual(trashEmail1.id);
});
