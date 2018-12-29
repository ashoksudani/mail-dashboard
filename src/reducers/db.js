import { createReducer } from 'redux-orm';
import orm from 'models/orm';
const dbReducer = createReducer(orm);

export default dbReducer;
