import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './rootReducer';

// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument())));

export default store;
