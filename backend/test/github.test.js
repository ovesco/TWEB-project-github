require('dotenv').config();

const { expect } = require('chai');

const Api = require('./../github');

const github = new Api();

describe('extract', () => {
    it('should extract properties from object', () => {
        const example = {
            swag: 'swag',
            test: 'test',
            nullval: null,
            'a-number': 2,
        };

        expect(github.extract(example, ['swag', 'test', 'nullval', 'a-number'])).to.deep.equal(example);
        expect(github.extract(example, ['swag'])).to.deep.equal({ swag: 'swag' });
        expect(github.extract(example, [])).to.deep.equal({});
        expect(github.extract(example, ['notThere'])).to.deep.equal({});
    });
});
