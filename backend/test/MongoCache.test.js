require('dotenv').config();

const { expect, done } = require('chai');
const mongoose = require('mongoose');

const MongoCache = require('./../MongoCache');

mongoose.connect(process.env.MONGO_PATH);

describe('caching', () => {
    it('should correctly cache and retrieve items', () => {
        const path = 'test';
        const username = 'testusername';
        const response = { dummy: 'dummou', voili: 'voilou' };

        const cache = new MongoCache();

        // Put something in cache
        cache.set(path, username, response).then(() => {
            cache.get(path, username).then((res) => {
                expect(res).to.deep.equal(response);
                done();
            });
        });
    });

    it('should correctly cache with expire correctly', () => {
        const cache = new MongoCache(0);

        // Put something in cache
        cache.set('test2', 'test2username', {empty: 'response'}).then(() => {
            cache.get('test2', 'test2username').then((res) => {
                expect(res).to.be.null;
                done();
            });
        });
    });
});
