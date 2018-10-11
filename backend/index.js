require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Github = require('./github');

const app = express();
const port = 3000;
const api = new Github(process.env.TOKEN);

// Enable all cors request
app.use(cors());

app.get('/api/user/:username', (req, res) => {
    /* eslint-disable prefer-destructuring */
    const username = req.params.username;
    console.log(`Retrieving information about user ${username}`);
    api.getUser(username).then((data) => {
        res.json(data);
    }).catch((error) => {
        winston.error(error);
        res.json(error.response.status);
    });
});

app.get('/api/commits/:username', (req, res) => {
    /* eslint-disable prefer-destructuring */
    const username = req.params.username;
    console.log(`Retrieving commits information about user ${username}`);
    api.getCommits(username).then((commits) => {
        console.log(`Found ${commits.length} commits for user ${username}!`);
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
        console.log(`Found ${repos.length} repositories for user ${username}!`);
        res.json(repos);
    })
        .catch((error) => {
            console.log(error);
            res.sendStatus(403);
        });
});

app.listen(port);
