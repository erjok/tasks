import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ version: '0.1.0' });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});