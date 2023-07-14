import express from 'express';
import { query } from 'express-validator';

import reqValidator from './middleware/request-validator.js';
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
    numbers.sort((a, b) => a - b);
    const quanitifer = q || 1;
    const minNumbers = numbers.slice(0, quanitifer);
    res.status(200).json({ numbers: minNumbers });
});

app.get('/max', validateNumbers(), reqValidator, (req, res) => {
    const { numbers, q } = req.query;
    const quantifier = q || 1;
    numbers.sort((a, b) => b - a);
    const minNumbers = numbers.slice(0, quantifier);
    res.status(200).json({ numbers: minNumbers });
});

app.get('/avg', validateNumbers(), reqValidator, (req, res, next) => {
    const { numbers } = req.query;
    const avg = numbers.reduce((a, b) => a + b) / numbers.length;
    res.status(200).json({ avg });
});

app.get('/median', validateNumbers(), reqValidator, (req, res, next) => {
    const { numbers } = req.query;
    numbers.sort((a, b) => a - b);
    let median = NaN;
    if (numbers.length > 0) {
        const isOdd = numbers.length % 2 === 1;
        const midIndex = Math.floor(numbers.length / 2);
        median = isOdd ? numbers[midIndex] : (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
    }

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
        numbers.sort((a, b) => a - b);

        var index = (q / 100) * (numbers.length - 1);
        var percentile = numbers[Math.round(index)];

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