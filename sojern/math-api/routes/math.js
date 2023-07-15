import { Router } from 'express';
import { query } from 'express-validator';

import reqValidator from '../middleware/request-validator.js';
import calculator from '../services/calculator.js';

const router = Router();

const validateNumbers = () =>
    query('numbers')
        .trim()
        .notEmpty()
        .withMessage('Numbers are required.')
        .customSanitizer(value => value.split(',').filter(s => s).map(Number))
        .custom(value => {
            if (value.some(isNaN))
                throw new Error('Numbers must be a comma-separated list of numbers.');

            if (value.length === 0)
                throw new Error('Numbers must have at least one number.')

            return true;
        });

router.get('/min', validateNumbers(), reqValidator, (req, res) => {
    const { numbers, q } = req.query;
    const minNumbers = calculator.min(numbers, q);
    res.status(200).json({ minNumbers });
});

router.get('/max', validateNumbers(), reqValidator, (req, res) => {
    const { numbers, q } = req.query;
    const maxNumbers = calculator.max(numbers, q);
    res.status(200).json({ maxNumbers });
});

router.get('/avg', validateNumbers(), reqValidator, (req, res, next) => {
    const { numbers } = req.query;
    const avg = calculator.avg(numbers);
    res.status(200).json({ avg });
});

router.get('/median', validateNumbers(), reqValidator, (req, res, next) => {
    const { numbers } = req.query;
    const median = calculator.median(numbers);
    res.status(200).json({ median });
});

router.get('/percentile',
    query('q')
        .notEmpty().withMessage('Percentile quantifier is required.')
        .isInt({ min: 0, max: 100 }).withMessage('Percentile quantifier must be between 0 and 100.'),
    validateNumbers(),
    reqValidator,
    (req, res, next) => {
        const { numbers, q } = req.query;
        const percentile = calculator.percentile(numbers, q);
        res.status(200).json({ percentile });
    });

export default router;