import { ITileCollection } from '../../interfaces';
import moveStrategies from '../move-strategies';
import * as mocks from './move-strategies.mock';
import { expect } from 'chai';

describe("MOVE STRATEGIES", () => {
    it("Должен сдвинуть все плитки влево", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToLeft(mocks.tileCollectionToLeft);
        expect(tileCollection).to.deep.equal(mocks.tileCollectionToLeftResult);
        expect(scores).to.be.equal(mocks.toLeftScores);
    });

    it("Должен сдвинуть все плитки вправо", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToRight(mocks.tileCollectionToRight);
        expect(tileCollection).to.deep.equal(mocks.tileCollectionToRightResult);
        expect(scores).to.be.equal(mocks.toRightScores);
    });

    it("Должен сдвинуть все плитки вверх", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToTop(mocks.tileCollectionToTop);
        expect(tileCollection).to.deep.equal(mocks.tileCollectionToTopResult);
        expect(scores).to.be.equal(mocks.toTopScores);
    });

    it("Должен сдвинуть все плитки вниз", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToBottom(mocks.tileCollectionToBottom);
        expect(tileCollection).to.deep.equal(mocks.tileCollectionToBottomResult);
        expect(scores).to.be.equal(mocks.toBottomScores);
    });
});