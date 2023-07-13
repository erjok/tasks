import express from 'express';
import { query, validationResult } from 'express-validator';

const app = express();
const validateNumbers = () =>
    query('numbers', 'Numbers are required.')
        .trim()
        .notEmpty()
        .custom(value => {
            const numbers = value.split(',').filter(s => s).map(Number);

            if (numbers.some(isNaN))
                throw new Error('Numbers must be a comma-separated list of numbers.');

            return numbers.length > 0;
        });

app.get('/', (req, res) => {
    res.status(200).json({ version: '0.1.0' });
});

app.get('/min', (req, res) => {
    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
    const quantifier = req.query.q || 1;
    numbers.sort((a, b) => a - b);
    const minNumbers = numbers.slice(0, quantifier);
    res.status(200).json({ numbers: minNumbers });
});

app.get('/max', (req, res) => {
    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
    const quantifier = req.query.q || 1;
    numbers.sort((a, b) => b - a);
    const minNumbers = numbers.slice(0, quantifier);
    res.status(200).json({ numbers: minNumbers });
});

app.get('/avg', validateNumbers(), (req, res, next) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        const error = new Error('One or more validation errors occurred.');
        error.status = 400;
        error.errors = result.mapped();
        return next(error);
    }

    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
    const avg = numbers.reduce((a, b) => a + b) / numbers.length;
    res.status(200).json({ avg });
});

app.get('/median', validateNumbers(), (req, res, next) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        const error = new Error('One or more validation errors occurred.');
        error.status = 400;
        error.errors = result.mapped();
        return next(error);
    }

    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
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
    validateNumbers(), (req, res, next) => {

        const result = validationResult(req).formatWith(err => err.msg);
        if (!result.isEmpty()) {
            const error = new Error('One or more validation errors occurred.');
            error.status = 400;
            error.errors = result.mapped();
            return next(error);
        }

        const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
        const quantifier = req.query.q;

        numbers.sort((a, b) => a - b);

        var index = (quantifier / 100) * (numbers.length - 1);
        var percentile = numbers[Math.round(index)];

        res.status(200).json({ percentile });
    });

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const problemDetails = {
        status,
        title: err.message,
        errors: err.errors,
    };

    res.status(status)
        .contentType('application/problem+json')
        .json(problemDetails);
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});