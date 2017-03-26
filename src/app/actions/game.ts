import {
    START_GAME,
    FINISH_GAME    
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
        dispatch({
            type: START_GAME
        }), // стартуем игру
        dispatch(clearScores()), // очищаем очки
        dispatch(resetTiles()), // обнуляем плитки
        // добавляем две плитки
        dispatch(createNewTile()),
        dispatch(createNewTile())
    ]);
};

export const finishGame:Function = ():IActionSuccess => ({
    type: FINISH_GAME
});