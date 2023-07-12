import express from 'express';

const app = express();

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

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});