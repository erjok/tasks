import express from 'express';
import { query } from 'express-validator';

import reqValidator from './middleware/request-validator.js';
import calculator from './services/calculator.js';
import ProblemDetails from './models/problem-details.js';

const app = express();
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

app.get('/', (req, res) => {
    res.status(200).json({ version: '0.1.0' });
});

app.get('/min', validateNumbers(), reqValidator, (req, res) => {
    const { numbers, q } = req.query;
    const minNumbers = calculator.min(numbers, q);
    res.status(200).json({ minNumbers });
});

app.get('/max', validateNumbers(), reqValidator, (req, res) => {
    const { numbers, q } = req.query;
    const maxNumbers = calculator.max(numbers, q);
    res.status(200).json({ maxNumbers });
});

app.get('/avg', validateNumbers(), reqValidator, (req, res, next) => {
    const { numbers } = req.query;
    const avg = calculator.avg(numbers);
    res.status(200).json({ avg });
});

app.get('/median', validateNumbers(), reqValidator, (req, res, next) => {
    const { numbers } = req.query;
    const median = calculator.median(numbers);
    res.status(200).json({ median });
});

app.get('/percentile',
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

app.use((err, req, res, next) => {
    const problemDetails = ProblemDetails.fromError(err);
    res.status(problemDetails.status)
        .contentType('application/problem+json')
        .json(problemDetails);
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});