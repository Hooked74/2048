import { ITileCollection } from '../../interfaces';
import moveStrategies from '../move-strategies';
import * as mocks from './move-strategies.mock';
import { expect } from 'chai';

describe("MOVE STRATEGIES", () => {
    it("Должен сдвинуть все плитки влево", () => {
        const {tileCollections, scores} = moveStrategies.moveTilesToLeft(mocks.toLeftMock);
        expect(tileCollections).to.deep.equal(mocks.toLeftResult);
        expect(scores).to.be.equal(mocks.toLeftScores);
    });

    it("Должен сдвинуть все плитки вправо", () => {
        const {tileCollections, scores} = moveStrategies.moveTilesToRight(mocks.toRightMock);
        expect(tileCollections).to.deep.equal(mocks.toRightResult);
        expect(scores).to.be.equal(mocks.toRightScores);
    });

    it("Должен сдвинуть все плитки вверх", () => {
        const {tileCollections, scores} = moveStrategies.moveTilesToTop(mocks.toTopMock);
        expect(tileCollections).to.deep.equal(mocks.toTopResult);
        expect(scores).to.be.equal(mocks.toTopScores);
    });

    it("Должен сдвинуть все плитки вниз", () => {
        const {tileCollections, scores} = moveStrategies.moveTilesToBottom(mocks.toBottomMock);
        expect(tileCollections).to.deep.equal(mocks.toBottomResult);
        expect(scores).to.be.equal(mocks.toBottomScores);
    });
});