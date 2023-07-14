import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { check } from 'express-validator';

import reqValidator from '../../../middleware/request-validator.js';

const should = chai.should();
chai.use(sinonChai);

describe('request validator middleware' , () => {
    it('should call next middleware when there are no validation errors', async () => {
        const req = { query: { foo: 'bar' } };
        await check('foo').notEmpty().run(req);
        const next = sinon.spy();

        reqValidator(req, {}, next);
        next.should.have.been.calledOnceWithExactly();
    });

    it('should pass the validation error to error-handling middleware when validation error occurs', async () => {
        const req = { query: { } };
        await check('foo', 'blah').notEmpty().run(req);
        const next = sinon.spy();

        reqValidator(req, {}, next);

        const expectedError = sinon.match({
            message: 'One or more validation errors occurred.',
            code: 'VALIDATION_ERROR',
            errors: {
                foo: 'blah'
            }
        });

        next.should.have.been.calledOnceWithExactly(expectedError);
    });
});