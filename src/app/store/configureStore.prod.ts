import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { promises } from '../middlewares';
import * as reducers from '../reducers';

const reducersMap:Redux.ReducersMapObject = {...reducers};
const reducer = combineReducers(reducersMap);
const configureStore:Function = preloadedState => {
    const store:Redux.Store<any> = createStore(
        reducer,
        preloadedState,
        applyMiddleware(thunk, promises)
    );

    return store;
};

export default configureStore;