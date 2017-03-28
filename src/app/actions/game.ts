import {
    START_GAME,
    FINISH_GAME,
    PENDING_GAME   
} from '../constants';
import {
    IActionSuccess
} from '../interfaces';
import {
    resetTiles,
    createNewTile
} from './tiles';
import {
    clearScores
} from './scores';

export const startNewGame:Function = () => (dispatch:Redux.Dispatch<IActionSuccess>):Promise<any> => {
    return Promise.all([
        dispatch(resetTiles()), // обнуляем плитки
        dispatch(clearScores()), // очищаем очки
        // добавляем две плитки
        dispatch(createNewTile()),
        dispatch(createNewTile()),
        dispatch({
            type: START_GAME
        }) // стартуем игру
    ]);
};

export const pendingGame:Function = ():IActionSuccess => ({
    type: PENDING_GAME
});

export const finishGame:Function = (message:string):IActionSuccess => ({
    type: FINISH_GAME,
    payload: message
});