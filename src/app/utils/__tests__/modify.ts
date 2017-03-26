import * as modify from '../modify';
import { expect } from 'chai';

describe('MODIFY UTILS', () => {
    it('Должен заменить первую букву строки на заглавную', () => {
        expect(modify.capitalize("test")).to.be.equal("Test");
        expect(modify.capitalize(" test")).to.be.equal(" test");
    });
});