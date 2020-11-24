import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import loadingReducer from './loading/loadingReducer';
import userReducer from './user/userReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  loading:loadingReducer,
  trips:userReducer
});

export default rootReducer;