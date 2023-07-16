import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const port = process.env.NODE_PORT || 80;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});