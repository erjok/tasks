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

app.get('/max', (req, res) => {
    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
    const quantifier = req.query.q || 1;
    numbers.sort((a, b) => b - a);
    const minNumbers = numbers.slice(0, quantifier);
    res.status(200).json({ numbers: minNumbers });
});

app.get('/avg', (req, res) => {
    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
    const avg = numbers.reduce((a, b) => a + b) / numbers.length;
    res.status(200).json({ avg });
});

app.get('/median', (req, res) => {
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

app.get('/percentile', (req, res) => {
    const numbers = req.query.numbers?.split(',').filter(s => s).map(Number);
    const quantifier = req.query.q || 1;
    numbers.sort((a, b) => a - b);

    var index = (quantifier / 100) * (numbers.length - 1);
    var percentile = numbers[Math.round(index)];

    res.status(200).json({ percentile });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});