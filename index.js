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
    if (req.body.username && req.body.avatar) {
        const userRegister = users.find(
            (user) => user.username === req.body.username
        );
        if (userRegister) {
            res.status(400).send('User already exists');
        } else {
            users.push(req.body);
            console.log(
                chalk.bold.yellow(`User ${req.body.username} registered`)
            );
            res.status(201).send('OK');
        }
    } else {
        res.status(400).send('Missing username or avatar');
    }
});

app.get('/tweets', (req, res) => {
    const { page } = req.query;
    if (page <= 0) {
        res.status(400).send('Informe uma página válida!');
    } else {
        const limit = 10;
        let aux = tweets.slice((page - 1) * limit, page * limit);
        res.status(200).send(aux);
    }
});

app.get('/tweets/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find((user) => user.username === username);
    if (user) {
        const tweetsUser = tweets.filter(
            (tweet) => tweet.username === username
        );
        res.status(200).send(tweetsUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/tweets', (req, res) => {
    const tweetMessage = req.body.tweet;
    const { user } = req.headers;
    if (tweetMessage && user) {
        let tweet = {
            username: user,
            tweet: tweetMessage,
        };
        const userTweet = users.find(
            (user) => user.username === tweet.username
        );
        tweet = { ...tweet, avatar: userTweet.avatar };
        tweets.push(tweet);
        res.status(201).send('OK');
    } else {
        res.status(400).send('Missing username or tweet');
    }
});

app.listen(PORT, () => {
    console.log(chalk.bold.green('Server is running on port 5000'));
});

// ! <-- No bonus -->

/* import express from 'express';
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
    if (req.body.username && req.body.avatar) {
        const userRegister = users.find(
            (user) => user.username === req.body.username
        );
        if (userRegister) {
            res.status(400).send('User already exists');
        } else {
            users.push(req.body);
            res.status(201).send('OK');
        }
    } else {
        res.status(400).send('Missing username or avatar');
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
    if (req.body.username && req.body.tweet) {
        let tweet = {
            username: req.body.username,
            tweet: req.body.tweet,
        };
        const user = users.find((user) => user.username === tweet.username);
        tweet = { ...tweet, avatar: user.avatar };
        tweets.push(tweet);
        res.status(201).send('OK');
    } else {
        res.status(400).send('Missing username or tweet');
    }
});

app.listen(PORT, () => {
    console.log(chalk.bold.green('Server is running on port 5000'));
});
 */
