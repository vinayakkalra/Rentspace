import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import{ userReducer,hotelsReducer} from './reducers';

const rootReducer = combineReducers({ userReducer,hotelsReducer });

export default Store= configureStore({
  reducer: rootReducer,
});