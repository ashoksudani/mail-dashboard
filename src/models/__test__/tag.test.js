import * as ormUtils from './utils';
import * as actions from 'actions';

let orm = ormUtils.buildOrmFor('tag');
let ormSession;

beforeEach(() => {
  ormSession = ormUtils.createEmptySessionFor(orm);
});

test('it should create tags retrieved from mail aggregate action', () => {
  //Create action
  const firstTag = ormUtils.getSampleTagObj();
  const secondTag = ormUtils.getSampleTagObj();
  const mailAggregatePayload = {
    tags: [firstTag, secondTag]
  };

  const actionCreated = actions.createMailAggregateSuccess(
    mailAggregatePayload
  );

  const newSession = ormUtils.updateSessionWithActionDispatch(
    orm,
    ormSession,
    actionCreated
  );

  expect(newSession.tag.count()).toEqual(2);
  expect(newSession.tag.at(0).ref.id).toEqual(firstTag.id);
  expect(newSession.tag.at(1).ref.id).toEqual(secondTag.id);
});
