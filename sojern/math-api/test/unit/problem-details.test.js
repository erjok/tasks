import chai from 'chai';
import ProblemDetails from '../../models/problem-details.js';

chai.should();

describe('problem details', () => {
    it('should create problem details from error', () => {
        const error = new Error('error');
        const problemDetails = ProblemDetails.fromError(error);
        const expected = new ProblemDetails({ status: 500, title: 'error' });
        problemDetails.should.be.deep.equal(expected);
    });

    it('should create problem details from validation error', () => {
        const error = new Error('validation error');
        error.code = 'ValidationError';
        error.errors = {
            foo: 'bar',
        };
        const problemDetails = ProblemDetails.fromError(error);
        const expected = new ProblemDetails({ status: 400, title: 'validation error', errors: { foo: 'bar' } });
        problemDetails.should.be.deep.equal(expected);
    });
});
