import { ORM } from 'redux-orm';
import { createReducer } from 'redux-orm';
import nanoid from 'nanoid';

import Profile from 'models/profile';
import Email from 'models/email';
import Tag from 'models/tag';
import User from 'models/user';

const modelList = {
  profile: Profile,
  email: Email,
  tag: Tag,
  user: User
};

let orm;

export function buildOrmFor(...modelArgs) {
  orm = new ORM();
  const requiredModels = [];
  modelArgs.forEach(model => {
    requiredModels.push(modelList[model]);
  });
  orm.register(...requiredModels);
  return orm;
}

export function createEmptySessionFor(orm) {
  const emptyDBState = orm.getEmptyState();
  return orm.session(emptyDBState);
}

export function updateSessionWithActionDispatch(
  orm,
  ormSession,
  actionCreated
) {
  //Create reducer
  const reducer = createReducerFor(orm);
  //Dispatch an action
  const createdState = reducer(ormSession.state, actionCreated);
  //Recreate new session from new state
  return orm.session(createdState);
}

export function createReducerFor(orm) {
  return createReducer(orm);
}

//Profile
export function createProfile(ormSession, isAuthenticated = false) {
  return ormSession.profile.create({
    id: nanoid(),
    isAuthenticated: isAuthenticated
  });
}

//Email
export function getSampleEmailObj() {
  return {
    id: nanoid(),
    to: [],
    cc: [],
    subject: 'Sample Subject',
    body: 'Sample body',
    creationTime: new Date().getTime(),
    tags: [],
    unread: true
  };
}

export function createEmail(ormSession, emailObj = {}) {
  const emailPayload = Object.assign({}, getSampleEmailObj(), emailObj);

  return ormSession.email.create(emailPayload);
}

//User
export function getSampleUserObj() {
  return {
    id: nanoid(),
    firstName: 'Test Firstname',
    lastName: 'Test lastname',
    emailId: 'test@email.com',
    emails: [],
    contacts: []
  };
}

export function createUser(ormSession, userObj) {
  const userPayload = Object.assign({}, getSampleUserObj(), userObj);

  return ormSession.user.create(userPayload);
}

//Tag
export function getSampleTagObj() {
  return {
    id: nanoid(),
    label: 'Sample Tag'
  };
}

export function createTag(ormSession, tagObj) {
  const tagPayload = Object.assign({}, getSampleTagObj(), tagObj);
  return ormSession.tag.create(tagPayload);
}

export function getOrm() {
  return orm;
}
