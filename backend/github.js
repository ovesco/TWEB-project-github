const axios = require('axios');

module.exports = class Github {

    constructor(token, path = 'https://api.github.com') {
        this.token = token;
        this.path = path;
    }

    getUser(username) {
        const $this = this;
        let result = {};
        return new Promise((resolve, reject) => {
            $this.get(`/users/${username}`)
                .then((resUser) => {
                    // Extract useful intels from user response
                    result = $this.extract(resUser.data, [
                        'login', 'avatar_url', 'gravatar_id', 'html_url', 'name', 'company', 'location', 'email',
                        'hireable', 'bio', 'created_at', 'followers', 'following',
                    ]);
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    getRepos(username) {
        const $this = this;
        return new Promise((resolve, reject) => {
            $this.get(`/users/${username}/repos`)
                .then((resRepos) => {
                    const result = [];
                    // Extract information about each repo
                    resRepos.data.forEach((repo) => {
                        result.push($this.extract(repo, [
                            'id', 'name', 'full_name', 'html_url', 'description', 'fork', 'forks_count',
                            'stargazers_count', 'watchers_count', 'size', 'open_issues_count', 'topics',
                            'has_issues', 'licence', 'created_at', 'language',
                        ]));
                    });
                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    getCommits(username) {
        const $this = this;
        return new Promise((resolve, reject) => {
            const result = [];
            $this.get(`/search/commits?q=author:${username}`, {
                Accept: 'application/vnd.github.cloak-preview',
            }).then((res) => {
                res.data.items.forEach(commit => result.push($this.extract(commit, ['sha', 'commit'])));
                resolve(result);
            }).catch(error => reject(error));
        });
    }

    get(uri, headers = {}) {
        /* eslint-disable no-param-reassign */
        headers.Authorization = `token ${this.token}`;
        return axios.get(this.path + uri, {
            headers,
        });
    }

    /**
     * Extracts values from an object to another object
     * @param object
     * @param arrayOfValues
     */
    extract(object, arrayOfValues) {
        const result = {};
        arrayOfValues.forEach((name) => {
            result[name] = object[name];
        });
        return result;
    }
};
