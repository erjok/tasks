import chai from 'chai';
import chaiAlmost from 'chai-almost';
import calculator from '../../services/calculator.js';

chai.use(chaiAlmost(0.001));
const should = chai.should();

describe('calculator', () => {
    [
        { count: 1, expected: [1] },
        { count: 2, expected: [1, 2] },
        { count: 3, expected: [1, 2, 3] },
        { count: 4, expected: [1, 2, 3] },
    ].forEach(({ count, expected }) => {
        it(`should find ${count} min numbers`, () => {
            calculator.min([3, 1, 2], count).should.deep.equal(expected);
        });
    });

    [
        { count: 1, expected: [3] },
        { count: 2, expected: [3, 2] },
        { count: 3, expected: [3, 2, 1] },
        { count: 4, expected: [3, 2, 1] },
    ].forEach(({ count, expected }) => {
        it(`should find ${count} max numbers`, () => {
            calculator.max([3, 1, 2], count).should.deep.equal(expected);
        });
    });

    [
        { numbers: [1], expected: 1 },
        { numbers: [1, 2], expected: 1.5 },
        { numbers: [1, 2, 5], expected: 2.667 },
        { numbers: [1, 2, 3, 5], expected: 2.75 },
    ].forEach(({ numbers, expected }) => {
        it(`should find avg of ${numbers}`, () => {
            calculator.avg(numbers).should.almost.equal(expected);
        });
    });

    [
        { numbers: [1], expected: 1 },
        { numbers: [1, 2], expected: 1.5 },
        { numbers: [1, 2, 5], expected: 2 },
        { numbers: [1, 2, 3, 5], expected: 2.5 },
    ].forEach(({ numbers, expected }) => {
        it(`should find median of ${numbers}`, () => {
            calculator.median(numbers).should.almost.equal(expected);
        });
    });

    [
        { n: 1, expected: 1 },
        { n: 10, expected: 1 },
        { n: 25, expected: 2 },
        { n: 75, expected: 4 },
        { n: 99, expected: 5 },
    ].forEach(({ n, expected }) => {
        it(`should find ${n}th percentile`, () => {
            calculator.percentile([4, 1, 5, 3, 2], n).should.almost.equal(expected);
        });
    });
});