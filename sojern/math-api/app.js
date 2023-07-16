import express from 'express';
import mathRouter from './routes/math.js';
import ProblemDetails from './models/problem-details.js';

const app = express();

app.use(mathRouter);

app.get('/', (req, res) => {
    res.status(200).json({ version: process.env.npm_package_version });
});

app.use((err, req, res, next) => {
    const problemDetails = ProblemDetails.fromError(err);
    res.status(problemDetails.status)
        .contentType('application/problem+json')
        .json(problemDetails);
});

export default app;