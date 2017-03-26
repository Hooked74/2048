import {
    BOARD_SIDE_LENGTH,
    BOARD_CELL_WIDTH,
    BOARD_CELL_HEIGHT,
    BOARD_CELL_GAP,
    TILE_FIRST_VALUE,
    TILE_SECOND_VALUE,
    TILE_FACTOR,
    UPDATE_TILES,
    CREATE_NEW_TILE
} from '../constants';
import {
    ITile,
    ITileCollection,
    ITilePosition,
    ITileRow,
    IActionSuccess
} from '../interfaces';
import moveStrategies from './move-strategies';
import { capitalize, generateUUID } from '../utils';
import { finishGame } from './game';
import { addScores } from './scores';

export const resetTiles:Function = ():IActionSuccess => {
    const tileCollection:ITileCollection = [];

    const value:number = 0;
    let top:number = 0;
    let left:number = 0;

    for (let i:number = 0; i < BOARD_SIDE_LENGTH; i++) {
        tileCollection.push([]);
        for (let j:number = 0; j < BOARD_SIDE_LENGTH; j++) {
            tileCollection[i][j] = { top, left, value, id: generateUUID() };
            left += BOARD_CELL_GAP + BOARD_CELL_WIDTH;
        }
        left = 0;
        top += BOARD_CELL_GAP + BOARD_CELL_HEIGHT;
    }

    return {
        type: UPDATE_TILES,
        payload: tileCollection
    };
}

export const createNewTile:Function = () => (dispatch:Redux.Dispatch<IActionSuccess>, getStore):Promise<any> => {
    const tileCollection:ITileCollection = getStore().tileCollection;
    const emptyCells:Array<ITilePosition> = [];
    const equalAdjacentValues = (value:number, i:number, j:number):boolean => {
        return tileCollection[i - 1]
            && tileCollection[i - 1][j]
            && tileCollection[i - 1][j].value === value
            || tileCollection[i + 1]
            && tileCollection[i + 1][j]
            && tileCollection[i + 1][j].value === value
            || tileCollection[i][j - 1]
            && tileCollection[i][j - 1].value === value
            || tileCollection[i][j + 1]
            && tileCollection[i][j + 1].value === value;
    };
    let isContinueGame:boolean = false;

    for (let i:number = 0; i < BOARD_SIDE_LENGTH; i++) {
        for (let j:number = 0; j < BOARD_SIDE_LENGTH; j++) {
            const currentTileValue:number = tileCollection[i][j].value;
            if (currentTileValue === 0) {
                emptyCells.push({
                    row: i,
                    column: j
                });
            } else if (!isContinueGame) {
                isContinueGame = equalAdjacentValues(currentTileValue, i, j);
            }
        }
    }

    if (emptyCells.length) {
        const randomEmptyCell:ITilePosition = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const randomTileValue:number = Math.random() < TILE_FACTOR ? TILE_FIRST_VALUE : TILE_SECOND_VALUE;
        
        const createNewTileDispatch = dispatch({
            type: CREATE_NEW_TILE,
            payload: {
                value: randomTileValue,
                ...randomEmptyCell
            }
        });

        if (!isContinueGame && emptyCells.length === 1) {
            isContinueGame = equalAdjacentValues(randomTileValue, randomEmptyCell.row, randomEmptyCell.column);
            if (!isContinueGame) return Promise.all([createNewTileDispatch, dispatch(finishGame())]);
        }
        return Promise.resolve(createNewTileDispatch);
    } else {
        return Promise.resolve(dispatch(finishGame()));
    }
}

type TBoardDirection = "left" | "right" | "top" | "bottom";
export const moveTiles:Function = (direction:TBoardDirection) => (dispatch:Redux.Dispatch<IActionSuccess>, getStore):Promise<any> => {
    const moveStrategy:Function = moveStrategies[`moveTilesTo${capitalize(direction)}`];
    if (moveStrategy) {
        const { tileCollection, scores } = moveStrategy(getStore().tileCollection);
        return Promise.all([
            dispatch({
                type: UPDATE_TILES,
                payload: tileCollection
            }),
            dispatch(addScores(scores)),
            dispatch(createNewTile())
        ]);
    } else {
        return Promise.resolve();
    }
}