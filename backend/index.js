require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const GithubApiWrapper = require('./GithubApiWrapper');
const MongoCache = require('./MongoCache');

mongoose.connect(process.env.MONGO_PATH, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
const app = express();
const port = process.env.PORT;

// Connect to mongoose before starting listening
db.once('open', () => {
    console.log('MongoDB connected!');

    // Register hooks
    const cache = new MongoCache();
    const api = new GithubApiWrapper(cache, process.env.TOKEN);

    // Enable all cors request
    app.use(cors());

    app.get('/api/user/:username', (req, res) => {
        /* eslint-disable prefer-destructuring */
        const username = req.params.username;
        console.log(`Retrieving information about user ${username}`);
        api.getUser(username).then((data) => {
            res.json(data);
        }).catch(() => {
            res.sendStatus(404);
        });
    });

    app.get('/api/commits/:username', (req, res) => {
        /* eslint-disable prefer-destructuring */
        const username = req.params.username;
        console.log(`Retrieving commits information about user ${username}`);
        api.getCommits(username).then((commits) => {
            res.json(commits);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(402);
        });
    });

    app.get('/api/repos/:username', (req, res) => {
        /* eslint-disable prefer-destructuring */
        const username = req.params.username;
        console.log(`Retrieving repositories information about user ${username}`);
        api.getRepos(username).then((repos) => {
            res.json(repos);
        })
            .catch((error) => {
                console.log(error);
                res.sendStatus(403);
            });
    });

    app.listen(port, () => {
        console.log(`Server started listening for request on port ${port}`);
    });
});
