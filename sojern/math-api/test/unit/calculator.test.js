import chai from 'chai';
import calculator from '../../services/calculator.js';

const should = chai.should();

describe('calculator', () => {
    [
        { count: 1, expected: [1] },
        { count: 2, expected: [1, 2] },
        { count: 3, expected: [1, 2, 3] },
        { count: 4, expected: [1, 2, 3] },
    ].forEach(({ count, expected }) => {
        it(`should find ${count} min numbers`, () => {
            calculator.min([3, 2, 1], count).should.deep.equal(expected);
        });
    });
});