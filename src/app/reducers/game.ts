import { 
    START_GAME,
    FINISH_GAME,
    GAME_STARTED,
    GAME_FINISHED,
    GAME_PENDING
} from '../constants';
import {
    IGameState,
    IActionSuccess,
    IActionError
} from '../interfaces';

type TAction = IActionSuccess & IActionError;
const gameInitialState:IGameState = { status: GAME_PENDING };
export const game:Redux.Reducer<any> = (state:IGameState = gameInitialState, action:TAction):IGameState => {
    switch (action.type) {
    case START_GAME:
        return { status: GAME_STARTED };
    case FINISH_GAME:
        return { status: GAME_FINISHED };
    default:
        return state;
    }
};