import { ORM } from 'redux-orm';
import Profile from 'models/profile';
import User from 'models/user';
import Email from 'models/email';

const orm = new ORM();
orm.register(Profile, User, Email);

export default orm;
