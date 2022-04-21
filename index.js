import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
const PORT = 5000;

const app = express();
app.use(cors());

let users = [];
let tweets = [];

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/sign-up', (req, res) => {
    const userRegister = users.find(
        (user) => user.username === req.body.username
    );
    if (userRegister) {
        res.status(400).send('User already exists');
    } else {
        users.push(req.body);
        res.status(200).send('OK');
    }
});

app.get('/tweets', (req, res) => {
    if (tweets.length < 10) {
        let aux = [];
        for (let i = tweets.length - 1; i >= 0; i--) {
            aux.push(tweets[i]);
        }
        res.status(200).send(aux);
    } else {
        let aux = [];
        for (let i = tweets.length - 1; i >= tweets.length - 10; i--) {
            aux.push(tweets[i]);
        }
        res.status(200).send(aux);
    }
});

app.post('/tweets', (req, res) => {
    let tweet = {
        username: req.body.username,
        tweet: req.body.tweet,
    };
    const user = users.find((user) => user.username === tweet.username);
    tweet = { ...tweet, avatar: user.avatar };
    tweets.push(tweet);
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(chalk.bold.green('Server is running on port 5000'));
});
