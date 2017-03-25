import configureMockStore from 'redux-mock-store';
import { promises } from '../promises';
import { PROMISE } from '../../constants';
import { IActionPromise, IActionSuccess, IActionError, IAction } from '../../interfaces';
const middlewares:Array<Function> = [promises];
const mockStore:Function = configureMockStore(middlewares);

const START_PROMISE:string = 'START_PROMISE';
const SUCCESS_PROMISE:string = 'SUCCESS_PROMISE';
const FAILURE_PROMISE:string = 'FAILURE_PROMISE';
const DO_SOMETHING:string = 'DO_SOMETHING';

describe('PROMISES MIDDLEWARE', () => {
    it('Должен пропустить выполнение в следующий middleware и вернуть action', () => {
        const store = mockStore({});
        const action:IActionPromise = {
            type: DO_SOMETHING,
            promiseTypes: [START_PROMISE, SUCCESS_PROMISE, FAILURE_PROMISE],
            promise: Promise.resolve({ test: 'test' })
        };
        expect(store.dispatch(action)).toEqual(action);

        const actions:Array<IActionPromise> = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(action);
    });

    it('Должен выполниться action success и вернуть результаты промиса', () => {
        const store = mockStore({});
        const data = { test: 'test' };
        const action:IActionPromise = {
            type: PROMISE,
            promiseTypes: [START_PROMISE, SUCCESS_PROMISE, FAILURE_PROMISE],
            promise: Promise.resolve(data)
        };
        return store.dispatch(action).then(() => {
            const resultActions:Array<IActionSuccess> = [ 
                { type: START_PROMISE },
                { type: SUCCESS_PROMISE, payload: data } 
            ];
            expect(store.getActions()).toEqual(resultActions);
        });
    });

    it('Должен выполниться action failure и вернуть результаты промиса', () => {
        const store = mockStore({});
        const data = { test: 'test' };
        const action:IActionPromise = {
            type: PROMISE,
            promiseTypes: [START_PROMISE, SUCCESS_PROMISE, FAILURE_PROMISE],
            promise: Promise.reject(data)
        };
        return store.dispatch(action).then(() => {
            const resultActions:Array<IActionSuccess | IActionError> = [ 
                { type: START_PROMISE },
                { type: FAILURE_PROMISE, error: data } 
            ];
            expect(store.getActions()).toEqual(resultActions);
        });      
    });
});