import { Model, attr } from 'redux-orm';
import * as actionList from 'constants/actions';

class Tag extends Model {}
Tag.modelName = 'tag';
Tag.fields = {
  id: attr(),
  label: attr()
};
Tag.reducer = function(action, Tag, session) {
  switch (action.type) {
    case actionList.MAIL_AGGREGATE_SUCCESS:
      action.payload.response.tags.forEach(tag => {
        Tag.create(tag);
      });
      break;
    default:
      break;
  }
};
export default Tag;
