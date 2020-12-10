import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import loadingReducer from './loading/loadingReducer';
import userReducer from './user/userReducer';
import currentTripReducer from './currentTrip/currentTripReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  loading:loadingReducer,
  trips:userReducer,
  currentTrio:currentTripReducer
});

export default rootReducer;