import { ORM } from 'redux-orm';
import Profile from 'models/profile';
import User from 'models/user';
import Email from 'models/email';
import Tag from 'models/tag';

const orm = new ORM();
orm.register(Profile, User, Email, Tag);

export default orm;
