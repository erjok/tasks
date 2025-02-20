// eslint-disable-next-line no-unused-vars
import express from 'express';
import { validationResult } from 'express-validator';

/**
 * @type {express.RequestHandler}
 */
export default function (req, res, next) {
    const errors = validationResult(req).formatWith(err => err.msg);
    if (errors.isEmpty()) {
        next();
        return;
    }

    const error = new Error('One or more validation errors occurred.');
    error.code = 'ValidationError';
    error.errors = errors.mapped();
    next(error);
}
