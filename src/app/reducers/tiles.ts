import { 
    UPDATE_TILES,
    CREATE_NEW_TILE
} from '../constants';
import {
    ITile,
    ITileRow,
    ITileCollection,
    ITileRenewable,
    IActionSuccess,
    IActionError
} from '../interfaces';

type TAction = IActionSuccess | IActionError;
const tilesInitialState:ITileCollection = null;
export const tileCollection:Redux.Reducer<ITileCollection> = (state:ITileCollection = tilesInitialState, action:TAction):ITileCollection => {
    switch (action.type) {
    case UPDATE_TILES:
        if (!Array.isArray(action.payload)) {
            throw new Error("Tile collection is unknow format.");
        }
        return [...action.payload];
    case CREATE_NEW_TILE:
        if (state) {
            const tileRenewable:ITileRenewable = action.payload;
            const newTile:ITile = {
                ...state[tileRenewable.row][tileRenewable.column],
                value: tileRenewable.value    
            };

            const cloneTileRow:ITileRow = [...state[tileRenewable.row]];
            cloneTileRow[tileRenewable.column] = newTile;

            const cloneTileCollection:ITileCollection = [...state];
            cloneTileCollection[tileRenewable.row] = cloneTileRow;
            return cloneTileCollection;
        }
    default:
        return state;
    }
};