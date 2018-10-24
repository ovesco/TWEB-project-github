const axios = require('axios');

module.exports = class {
    constructor(cache, token, path = 'https://api.github.com') {
        this.token = token;
        this.cache = cache;
        this.path = path;
    }

    getUser(username) {
        return this.handleCacheVerification('getUser', username, `/users/${username}`, (result) => {
            return this.extract(result, ['login', 'avatar_url', 'gravatar_id', 'html_url', 'name', 'company',
                'location', 'email', 'hireable', 'bio', 'created_at', 'followers', 'following',
            ]);
        });
    }

    getRepos(username) {
        return this.handleCacheVerification('getRepos', username, `/users/${username}/repos`, (result) => {
            return result.map(repo => this.extract(repo, ['id', 'name', 'full_name', 'html_url', 'description',
                'fork', 'forks_count', 'stargazers_count', 'watchers_count', 'size', 'open_issues_count',
                'topics', 'has_issues', 'licence', 'created_at', 'language',
            ]));
        });
    }

    getCommits(username) {
        return this.handleCacheVerification('getCommits', username, `/search/commits?q=author:${username}`,
            result => result.items.map(commit => this.extract(commit, ['sha', 'commit'])),
            { Accept: 'application/vnd.github.cloak-preview' });
    }

    get(uri, headers = {}) {
        /* eslint-disable no-param-reassign */
        headers.Authorization = `token ${this.token}`;
        return axios.get(this.path + uri, {
            headers,
        });
    }

    handleCacheVerification(methodName, username, path, extractMethod, headers = {}) {
        const $this = this;
        return new Promise((resolve, reject) => {
            // Check if we have a cached version
            $this.cache.get(methodName, username).then((cachedVersion) => {
                // No cached version found
                if (cachedVersion === null) {
                    console.log(`No cache found for query [${methodName} - username:${username}]`);
                    $this.get(path, headers).then((res) => {
                        // Extract useful information from user response
                        const result = extractMethod(res.data);
                        // Store in cache
                        $this.cache.set(methodName, username, result);
                        resolve(result);
                    }).catch(error => reject(error));
                } else {
                    resolve(cachedVersion);
                }
            });
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
            if (name in object) result[name] = object[name];
        });
        return result;
    }
};
