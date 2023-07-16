import { Router } from 'express';
import { query, param } from 'express-validator';

import reqValidator from '../middleware/request-validator.js';
import calculator from '../services/calculator.js';

const router = Router();

const createNumbersValidationChain = () =>
    param('numbers')
        .customSanitizer(value => value.split(',').filter(s => s).map(Number))
        .custom(value => {
            if (value.some(isNaN))
                throw new Error('Numbers must be a comma-separated list of numbers.');

            if (value.length === 0)
                throw new Error('Numbers must have at least one number.')

            return true;
        });

router.get('/min/:numbers',
    query('q').default(1).isInt({ min: 1 }).withMessage('Quantifier must be an integer number greater than 1.'),
    createNumbersValidationChain(),
    reqValidator,
    (req, res) => {
        const minNumbers = calculator.min(req.params.numbers, req.query.q);
        res.status(200).json({ minNumbers });
    });

router.get('/max/:numbers',
    query('q').default(1).isInt({ min: 1 }).withMessage('Quantifier must be an integer number greater than 1.'),
    createNumbersValidationChain(),
    reqValidator,
    (req, res) => {
        const maxNumbers = calculator.max(req.params.numbers, req.query.q);
        res.status(200).json({ maxNumbers });
    });

router.get('/avg/:numbers', createNumbersValidationChain(), reqValidator, (req, res, next) => {
    const avg = calculator.avg(req.params.numbers);
    res.status(200).json({ avg });
});

router.get('/median/:numbers', createNumbersValidationChain(), reqValidator, (req, res, next) => {
    const median = calculator.median(req.params.numbers);
    res.status(200).json({ median });
});

router.get('/percentile/:q/:numbers',
    param('q').isInt({ min: 0, max: 100 }).withMessage('Percentile quantifier must be an integer number between 0 and 100.'),
    createNumbersValidationChain(),
    reqValidator,
    (req, res, next) => {
        const { numbers, q } = req.params;
        const percentile = calculator.percentile(numbers, q);
        res.status(200).json({ percentile });
    });

export default router;