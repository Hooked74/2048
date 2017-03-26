import * as reducers from '../game';
import { expect } from 'chai';
import {
    START_GAME,
    FINISH_GAME,
    GAME_STARTED,
    GAME_FINISHED,
    GAME_PENDING
} from '../../constants';
import {
    IGameState
} from '../../interfaces';

describe('GAME REDUCERS', () => {
    const gameInitialState:IGameState = { status: GAME_PENDING };
    it('Должен вернуть начальное состояние', () => {
        expect(reducers.game(undefined, {})).to.deep.equal(gameInitialState);
    });

    it('Должен обработать START_GAME', () => {
        expect(reducers.game(false, { type: START_GAME })).to.deep.equal({ status: GAME_STARTED });
    });

    it('Должен обработать FINISH_GAME', () => {
        expect(reducers.game(false, { type: FINISH_GAME })).to.deep.equal({ status: GAME_FINISHED });
    });
});