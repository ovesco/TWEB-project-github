const Mongoose = require('mongoose');

const CacheItem = Mongoose.model('cacheItem', new Mongoose.Schema({
    path: String,
    username: String,
    response: String,
    date: { type: Date, default: Date.now },
}));

module.exports = class {
    constructor(expiration = process.env.CACHE_EXPIRATION) {
        this.expiration = parseInt(expiration, 10);
    }

    get(path, username) {
        return new Promise((resolve, reject) => {
            CacheItem.findOne({ path, username }, (err, item) => {
                if (err) reject(err);

                // Check cache existence and validity
                if (item === null) resolve(null);
                else if (Date.now() - item.date.getTime() > this.expiration * 1000) {
                    this.remove(path, username).then(() => {
                        resolve(null);
                    });
                } else resolve(JSON.parse(item.response));
            });
        });
    }

    remove(path, username) {
        return new Promise((resolve, reject) => {
            CacheItem.deleteMany({ path, username }, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    set(path, username, objectResponse) {
        return new Promise((resolve, reject) => {
            // First make sure there's no other item in cache
            this.remove(path, username).then(() => {
                const response = JSON.stringify(objectResponse);
                const cacheItem = new CacheItem({ path, username, response });
                cacheItem.save((err, item) => {
                    if (err) reject(err);
                    resolve(item);
                });
            });
        });
    }
};
