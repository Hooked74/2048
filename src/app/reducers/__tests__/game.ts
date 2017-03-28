import * as reducers from '../game';
import { expect } from 'chai';
import {
    START_GAME,
    FINISH_GAME,
    PENDING_GAME,
    GAME_STARTED,
    GAME_FINISHED,
    GAME_PENDING
} from '../../constants';
import {
    IGameState
} from '../../interfaces';

describe('GAME REDUCERS', () => {
    const gameInitialState:IGameState = { status: GAME_PENDING, message: "" };
    it('Должен вернуть начальное состояние', () => {
        expect(reducers.game(undefined, { type: null })).to.deep.equal(gameInitialState);
    });

    it('Должен обработать PENDING_GAME', () => {
        expect(reducers.game(false, { type: PENDING_GAME })).to.deep.equal(gameInitialState);
    });

    it('Должен обработать START_GAME', () => {
        expect(reducers.game(false, { type: START_GAME })).to.deep.equal({ status: GAME_STARTED, message: "" });
    });

    it('Должен обработать FINISH_GAME', () => {
        expect(reducers.game(false, { 
            type: FINISH_GAME, 
            payload: "test" 
        })).to.deep.equal({ status: GAME_FINISHED, message: "test" });
    });
});