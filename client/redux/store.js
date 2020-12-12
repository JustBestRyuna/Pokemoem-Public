import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from './reducers/index';

const configureStore = () => {
  const enhancer = compose(composeWithDevTools(applyMiddleware(thunk)));
  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development,'
});

export default wrapper;