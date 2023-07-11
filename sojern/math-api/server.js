import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});