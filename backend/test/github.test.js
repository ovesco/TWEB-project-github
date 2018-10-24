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

        expect(github.extract(example, ['swag', 'test', 'nullval', 'a-number']).to.deepEqual(example));
        expect(github.extract(example, ['swag']).to.deepEqual({swag: 'swag'}));
        expect(github.extract(example, []).to.deepEqual({}));
        expect(github.extract(example, ['notThere']).to.deepEqual({}));
    });
});

