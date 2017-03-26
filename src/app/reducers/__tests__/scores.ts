import * as reducers from '../scores';
import { expect } from 'chai';
import {
    ADD_SCORES,
    CLEAR_SCORES
} from '../../constants';
import {
    IScoresState​​
} from '../interfaces';

describe('SCORES REDUCERS', () => {
    const scoresInitialState:IScoresState​​ = { value: 0 };
    it('Должен вернуть начальное состояние', () => {
        expect(reducers.scores(undefined, {})).to.deep.equal(scoresInitialState);
    });

    it('Должен обработать ADD_SCORES', () => {
        expect(reducers.scores({ value: 10 }, { type: ADD_SCORES, payload: 20 })).to.deep.equal({ value: 30 });
    });

    it('Должен обработать CLEAR_SCORES', () => {
        expect(reducers.scores({ value: 10 }, { type: CLEAR_SCORES })).to.deep.equal(scoresInitialState);
    });
});