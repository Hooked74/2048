import { PROMISE } from '../constants';
import { IActionSuccess, IActionError } from '../interfaces';

export const promises:Redux.Middleware = store => next => action => {
    if (action.type !== PROMISE) return next(action);

    const [startType, successType, failureType]:Array<string> = action.promiseTypes;
    const startPromiseAction:IActionSuccess = { type: startType };
    store.dispatch(startPromiseAction);

    return action.promise
        .then((data:any) => {
            const promiseSuccessAction:IActionSuccess = {
                type: successType,
                payload: data  
            };
            return store.dispatch(promiseSuccessAction);
        })
        .catch((error:Error) => {
            const promiseErrorAction:IActionError = {
                type: successType,
                error  
            };
            return store.dispatch(promiseErrorAction);
        });
};