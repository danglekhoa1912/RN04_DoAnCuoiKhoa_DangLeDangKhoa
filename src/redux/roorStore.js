import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import ProductReducer from './reducers/ProductReducer';
import UserReducer from './reducers/UserReducer';

const rootReducers = combineReducers({ProductReducer, UserReducer});

const store = createStore(rootReducers);

export default store;
