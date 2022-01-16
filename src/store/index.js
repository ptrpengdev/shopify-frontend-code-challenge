// import { applyMiddleware, createStore, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from '../reducers/index';

// export function configureStore(preloadedState) {
//   const middlewares = [thunkMiddleware];

//   const middlewareEnhancer = composeWithDevTools(
//     applyMiddleware(...middlewares)
//   );

//   const enhancers = [middlewareEnhancer];
//   const composedEnhancers = compose(...enhancers);

//   const store = createStore(rootReducer, preloadedState, composedEnhancers);

//   return store;
// }
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/index'

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}