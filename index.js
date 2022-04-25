import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
const PORT = 5000;

const app = express();
app.use(cors());

let users = [];
let tweets = [
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-58-639x700.jpg',
        tweet: 'Hy guys, I am a cat',
    },
    {
        username: 'Goku',
        avatar: 'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
        tweet: 'I dont believe this, but I am a cat',
    },
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-58-639x700.jpg',
        tweet: 'Oh my god, seriously?',
    },
    {
        username: 'Goku',
        avatar: 'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
        tweet: 'Of course',
    },
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-58-639x700.jpg',
        tweet: 'Omg, we are the best cats ever',
    },
    {
        username: 'Goku',
        avatar: 'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
        tweet: 'Yes, we are the best',
    },
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-58-639x700.jpg',
        tweet: 'Goku, Dragon Ball Z is onde of the best anime ever',
    },
    {
        username: 'Goku',
        avatar: 'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
        tweet: 'Thanks Bob, I love Bob Sponge too!',
    },
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-58-639x700.jpg',
        tweet: 'What do you think about a crossover?',
    },
    {
        username: 'Goku',
        avatar: 'https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png',
        tweet: 'Will be amazing!',
    },
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-58-639x700.jpg',
        tweet: 'Yes, i think so too',
    },
];

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
    const page = parseInt(req.query.page);

    if (!page || page <= 0) {
        res.status(400).send('Informe uma página válida!');
    } else {
        const limit = 10;
        const searchTweet = tweets.length - page * limit;
        const firstTweet = (page - 1) * limit;

        let initialValue;
        if (tweets.length <= limit) {
            initialValue = 0;
        } else {
            if (searchTweet < 0) {
                initialValue = 0;
            } else {
                initialValue = searchTweet;
            }
        }

        let finalValue;
        if (firstTweet > tweets.length) {
            finalValue = 0;
        } else {
            if (initialValue === 0) {
                finalValue = tweets.length - firstTweet;
            } else {
                finalValue = initialValue + limit;
            }
        }
        res.send(tweets.slice(initialValue, finalValue).reverse());
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
