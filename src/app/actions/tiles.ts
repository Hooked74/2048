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

/**
 * Создает коллекцию с пустыми плитками
 */
export const resetTiles:Function = ():IActionSuccess => {
    const tileCollection:ITileCollection = []; // новая коллекция плиток

    const value:number = 0; // пустое значение плитки
    // координаты плитки
    let top:number = 0;
    let left:number = 0;

    // создаем матрицу плиток
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

/**
 * Создает плитку в случайном пустом месте
 */
export const createNewTile:Function = () => (dispatch:Redux.Dispatch<IActionSuccess>, getStore):Promise<any> => {
    const tileCollection:ITileCollection = getStore().tileCollection;
    // массив с координатами пустых плиток
    const emptyTiles:Array<ITilePosition> = [];
    // проверяет являются ли соседнии значения плиток эквивалентными текущему значению
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
    // модификатор продолжения игры
    let isContinueGame:boolean = false;

    // обходим матрицу плиток
    for (let i:number = 0; i < BOARD_SIDE_LENGTH; i++) {
        for (let j:number = 0; j < BOARD_SIDE_LENGTH; j++) {
            const currentTileValue:number = tileCollection[i][j].value;
            // если текущая плитка пустая, то сохраняем ее координаты
            if (currentTileValue === 0) {
                emptyTiles.push({
                    row: i,
                    column: j
                });
            // если соседнии значения текущего будут одинаковыми, то их можно будет соединить и продолжить игру
            } else if (!isContinueGame) {
                isContinueGame = equalAdjacentValues(currentTileValue, i, j);
            }
        }
    }

    // если есть пустые плитки
    if (emptyTiles.length) {
        // выбираем случайную пустую плитку
        const randomEmptyCell:ITilePosition = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        // выбираем случайное значение плитки
        const randomTileValue:number = Math.random() < TILE_FACTOR ? TILE_FIRST_VALUE : TILE_SECOND_VALUE;
        
        // вставляем новую плитку
        const createNewTileDispatch = dispatch({
            type: CREATE_NEW_TILE,
            payload: {
                value: randomTileValue,
                ...randomEmptyCell
            }
        });

        // если мы не нашли одинаковых соседних значений
        // и у до вставки оставалась последняя пустая плитка
        if (!isContinueGame && emptyTiles.length === 1) {
            // проверяем эквивалентность значений со вставленной текущей плиткой
            isContinueGame = equalAdjacentValues(randomTileValue, randomEmptyCell.row, randomEmptyCell.column);
            // если мы опять не нашли эквивалентных значений завершаем игру
            if (!isContinueGame) return Promise.all([createNewTileDispatch, dispatch(finishGame())]);
        }
        return Promise.resolve(createNewTileDispatch);
    } else {
        // заканчиваем игру если нет пустых плиток
        return Promise.resolve(dispatch(finishGame()));
    }
}

// 
type TBoardDirection = "left" | "right" | "top" | "bottom";
/**
 * Перемещает все плитки в соответствующем направлении
 * @param direction {TBoardDirection} направления движения плиток
 */
export const moveTiles:Function = (direction:TBoardDirection) => (dispatch:Redux.Dispatch<IActionSuccess>, getStore):Promise<any> => {
    // выбираем стратегию перемещения плиток
    const moveStrategy:Function = moveStrategies[`moveTilesTo${capitalize(direction)}`];
    if (moveStrategy) {
        // получаем новую коллекцию плиток и очки полученные за перемещение
        const { tileCollection, scores } = moveStrategy(getStore().tileCollection);
        return Promise.all([
            // обновляем коллекцию
            dispatch({
                type: UPDATE_TILES,
                payload: tileCollection
            }),
            dispatch(addScores(scores)), // добавляем очки
            dispatch(createNewTile()) // создаем новую плитку
        ]);
    } else {
        return Promise.resolve();
    }
}