import {
    ADD_SCORES,
    CLEAR_SCORES    
} from '../constants';
import {
    IActionSuccess
} from '../interfaces';

export const addScores:Function = (scores:number):IActionSuccess => ({
    type: ADD_SCORES,
    payload: scores
});

export const clearScores:Function = ():IActionSuccess => ({
    type: CLEAR_SCORES
});