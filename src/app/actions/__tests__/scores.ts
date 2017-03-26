import * as scoresActions from '../scores';
import { expect } from 'chai';
import {
    ADD_SCORES,
    CLEAR_SCORES 
} from '../../constants';

describe('LOADING ACTIONS', () => {
    it('Должен создать action, который добавляет очки', () => {
        const scores:number = 10;
        expect(scoresActions.addScores(scores)).to.deep.equal({
            type: ADD_SCORES,
            payload: scores
        });
    });

    it('Должен создать action, который обнуляет очки', () => {
        expect(scoresActions.clearScores()).to.deep.equal({
            type: CLEAR_SCORES
        });
    });
});