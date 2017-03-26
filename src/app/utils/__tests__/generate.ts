import * as generate from '../generate';
import { expect } from 'chai';

describe('GENERATE UTILS', () => {
    it('Должен заменить первую букву строки на заглавную', () => {
        expect(generate.generateUUID()).to.have.lengthOf(36).and.to.be.a("string");
    });
});