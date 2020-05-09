const sum = require('./sum');

describe('jest demo', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
    
    test('test string', () => {
        expect('alexqin').toBe('alexqin');
    });
});
