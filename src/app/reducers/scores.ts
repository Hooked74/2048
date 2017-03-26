import { 
    ADD_SCORES,
    CLEAR_SCORES
} from '../constants';
import {
    IScoresState​​,
    IActionSuccess,
    IActionError
} from '../interfaces';

type TAction = IActionSuccess & IActionError;
const scoresInitialState:IScoresState​​ = { value: 0 };
export const scores:Redux.Reducer<any> = (state:IScoresState​​ = scoresInitialState, action:TAction):IScoresState​​ => {
    switch (action.type) {
    case ADD_SCORES:
        const addedScores:number = Number.isFinite(action.payload) ? action.payload : 0;
        return { value: state.value + addedScores };
    case CLEAR_SCORES:
        return { value: 0 };
    default:
        return state;
    }
};