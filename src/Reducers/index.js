import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reminderReducer from './reminderReducer';
import reminderFormReducer from './reminderFormReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  reminderReducer,
  modalReducer,
  form,
  reminderFormReducer,
});

export default rootReducer;