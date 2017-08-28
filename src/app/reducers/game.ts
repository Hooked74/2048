import { 
    START_GAME,
    FINISH_GAME,
    GAME_STARTED,
    GAME_FINISHED,
    GAME_PENDING,
    PENDING_GAME
} from '../constants';
import {
    IGameState,
    IActionSuccess,
    IActionError
} from '../interfaces';

type TAction = IActionSuccess | IActionError;
const gameInitialState:IGameState = { status: GAME_PENDING, message: '' };
export const game:Redux.Reducer<any> = (state:IGameState = gameInitialState, action:TAction):IGameState => {
    switch (action.type) {
    case PENDING_GAME:
        return { status: GAME_PENDING, message: '' };
    case START_GAME:
        return { status: GAME_STARTED, message: '' };
    case FINISH_GAME:
        return { status: GAME_FINISHED, message: action.payload };
    default:
        return state;
    }
};