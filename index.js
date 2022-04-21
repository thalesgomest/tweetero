import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => {
    console.log(chalk.bold.green('Server is running on port 5000'));
});
