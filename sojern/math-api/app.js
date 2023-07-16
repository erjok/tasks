import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'fs';
import mathRouter from './routes/math.js';
import ProblemDetails from './models/problem-details.js';


const app = express();

const file = fs.readFileSync('swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(file);
app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

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