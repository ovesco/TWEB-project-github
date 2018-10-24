
import Axios from 'axios';

export default class Api {
    constructor(path, giphyToken) {
        this.path = path;
        this.giphy = giphyToken;
    }

    randomGif() {
        return new Promise((resolve, reject) => {
            Axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${this.giphy}&tag=&rating=R`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });
    }

    getUser(username) {
        return this.get('user', username);
    }

    getRepositories(username) {
        return this.get('repos', username);
    }

    getCommits(username) {
        return this.get('commits', username);
    }

    get(part, username) {
        return new Promise((resolve, reject) => {
            Axios.get(`${this.path}/api/${part}/${username}`)
                .then(res => resolve(res.data))
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
