import * as gameActions from '../game';
import mock from './game.mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import {
    START_GAME,
    FINISH_GAME,
    CLEAR_SCORES,
    UPDATE_TILES,
    CREATE_NEW_TILE
} from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('GAME ACTIONS', () => {
    it('Должен создать action, который начинает новую игру', () => {
        const store = mockStore({ tileCollections: mock });
        return store.dispatch(gameActions.startNewGame())
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.have.lengthOf(5);
                expect(actions[0]).to.deep.equal({type: START_GAME});
                expect(actions[1]).to.deep.equal({type: CLEAR_SCORES});
                expect(actions[2].type).to.be.equal(UPDATE_TILES);
                expect(actions[2]).to.have.ownProperty('payload');
                expect(actions[3].type).to.be.equal(CREATE_NEW_TILE);
                expect(actions[4].type).to.be.equal(CREATE_NEW_TILE);
                expect(actions[3].payload).to.have.all.keys(['column', 'row', 'value']);;
                expect(actions[4].payload).to.have.all.keys(['column', 'row', 'value']);;
            }); 
    });

    it('Должен создать action, который завершает игру', () => {
        expect(gameActions.finishGame()).to.deep.equal({
            type: FINISH_GAME
        });
    });
});