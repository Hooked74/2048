import * as tilesActions from '../tiles';
import * as mock from './tiles.mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import {
    BOARD_SIDE_LENGTH,
    BOARD_CELL_WIDTH,
    BOARD_CELL_HEIGHT,
    BOARD_CELL_GAP,
    TILE_FIRST_VALUE,
    TILE_SECOND_VALUE,
    TILE_FACTOR,
    UPDATE_TILES,
    CREATE_NEW_TILE,
    ADD_SCORES,
    FINISH_GAME
} from '../../constants';
import {
    ITileCollection,
    IActionSuccess
} from '../../interfaces';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TILES ACTIONS', () => {
    it('Должен создать action, который создают коллекцию с пустыми плитками', () => {
        const updateTilesAction:IActionSuccess = tilesActions.resetTiles();
        expect(updateTilesAction.type).to.be.equal(UPDATE_TILES);
        expect(updateTilesAction.payload).to.have.lengthOf(BOARD_SIDE_LENGTH);
        expect(updateTilesAction.payload[0]).to.have.lengthOf(BOARD_SIDE_LENGTH);
        if (BOARD_SIDE_LENGTH > 2) {
            expect(updateTilesAction.payload[1][1])
                .to.have.property("top", BOARD_CELL_HEIGHT + BOARD_CELL_GAP);
            expect(updateTilesAction.payload[1][1])
                .to.have.property("left", BOARD_CELL_WIDTH + BOARD_CELL_GAP);
        }
    });
    it('Должен создать action, который перемещает все плитки', () => {
        const store = mockStore({ tileCollection: mock.tileCollectionMoving });
        return store.dispatch(tilesActions.moveTiles("right"))
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.have.lengthOf(3);
                expect(actions[0]).to.deep.equal({type: UPDATE_TILES, payload: mock.tileCollectionMovingResult});
                expect(actions[1]).to.deep.equal({type: ADD_SCORES, payload: mock.movingScores});
                expect(actions[2].type).to.be.equal(CREATE_NEW_TILE);
                expect(actions[2].payload).to.have.all.keys(['column', 'row', 'value']);
            });
    });
    it('Должен создать action, который создаст новую плитку в случайном месте', () => {
        const store = mockStore({ tileCollection: mock.tileCollectionMoving });
        return store.dispatch(tilesActions.createNewTile())
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.have.lengthOf(1);
                expect(actions[0].type).to.be.equal(CREATE_NEW_TILE);
                expect(actions[0].payload).to.have.all.keys(['column', 'row', 'value']);
            });
    });
    it('Должен создать action, который создаст новую плитку, но не закончит игру, так как есть возможность хода', () => {
        const store = mockStore({ tileCollection: mock.tileCollectionCreatedNotFinished });
        return store.dispatch(tilesActions.createNewTile())
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.have.lengthOf(1);
                expect(actions[0].type).to.be.equal(CREATE_NEW_TILE);
                expect(actions[0].payload).to.have.all.keys(['column', 'row', 'value']);
            });
    });
    it('Должен создать action, который попытается создать новую плитку, но не создаст и закончит игру', () => {
        const store = mockStore({ tileCollection: mock.tileCollectionFinishedNotCreated });
        return store.dispatch(tilesActions.createNewTile())
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.have.lengthOf(1);
                expect(actions[0]).to.deep.equal({type: FINISH_GAME});
            });
    });
    it('Должен создать action, который создаст новую плитку в случайном месте и закончит игру', () => {
        const store = mockStore({ tileCollection: mock.tileCollectionCreatedAndFinished });
        return store.dispatch(tilesActions.createNewTile())
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.have.lengthOf(2);
                expect(actions[0].type).to.be.equal(CREATE_NEW_TILE);
                expect(actions[0].payload).to.have.all.keys(['column', 'row', 'value']);
                expect(actions[1]).to.deep.equal({type: FINISH_GAME});
            });
    });
});