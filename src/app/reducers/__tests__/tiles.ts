import * as reducers from '../tiles';
import * as mock from './tiles.mock';
import { expect } from 'chai';
import {
    UPDATE_TILES,
    CREATE_NEW_TILE
} from '../../constants';
import {
    ITileCollection
} from '../../interfaces';

describe('TILES REDUCERS', () => {
    const tilesInitialState:ITileCollection = null;
    it('Должен вернуть начальное состояние', () => {
        expect(reducers.tileCollection(undefined, { type: null })).to.deep.equal(tilesInitialState);
    });

    it('Должен обработать UPDATE_TILES', () => {
        expect(reducers.tileCollection(undefined, { 
            type: UPDATE_TILES, 
            payload: mock.tileCollection 
        })).to.deep.equal(mock.tileCollection);
        expect(() => reducers.tileCollection(undefined, { 
            type: UPDATE_TILES
        })).to.throw(Error);;
    });

    it('Должен обработать CREATE_NEW_TILE', () => {
        expect(reducers.tileCollection(null, { 
            type: CREATE_NEW_TILE,
            payload: mock.tileRenewable
        })).to.be.equal(null);
        expect(reducers.tileCollection(mock.tileCollection, { 
            type: CREATE_NEW_TILE,
            payload: mock.tileRenewable
        })).to.deep.equal(mock.tileCollectionRenewable);
    });
});