import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import { promises } from '../middlewares';
import * as reducers from '../reducers';

const reducersMap:Redux.ReducersMapObject = {...reducers};
const reducer = combineReducers(reducersMap);
const configureStore:Function = preloadedState => {
    const store:Redux.Store<any> = createStore(
        reducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, promises, createLogger()),
            DevTools.instrument()
        )
    );

    return store;
};

export default configureStore;