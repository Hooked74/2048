import { ITileCollection } from '../../interfaces';
import moveStrategies from '../move-strategies';
import * as mocks from './move-strategies.mock';
import { expect } from 'chai';

describe("MOVE STRATEGIES", () => {
    it("Должен сдвинуть все плитки влево", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToLeft(mocks.toLeftMock);
        expect(tileCollection).to.deep.equal(mocks.toLeftResult);
        expect(scores).to.be.equal(mocks.toLeftScores);
    });

    it("Должен сдвинуть все плитки вправо", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToRight(mocks.toRightMock);
        expect(tileCollection).to.deep.equal(mocks.toRightResult);
        expect(scores).to.be.equal(mocks.toRightScores);
    });

    it("Должен сдвинуть все плитки вверх", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToTop(mocks.toTopMock);
        expect(tileCollection).to.deep.equal(mocks.toTopResult);
        expect(scores).to.be.equal(mocks.toTopScores);
    });

    it("Должен сдвинуть все плитки вниз", () => {
        const {tileCollection, scores} = moveStrategies.moveTilesToBottom(mocks.toBottomMock);
        expect(tileCollection).to.deep.equal(mocks.toBottomResult);
        expect(scores).to.be.equal(mocks.toBottomScores);
    });
});