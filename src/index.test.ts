const { getCoffeeDates, splitUsersIntoPairs } = require('./index');

describe('splitUsersIntoPairs()', () => {
    it('splits array into an array of randomized pairs of two elements', () => {
        const pairs = splitUsersIntoPairs(['1', '2', '3', '4', '5', '6']);

        expect(pairs.length).toBe(3);
        expect(pairs[0].length).toBe(2);
        expect(pairs[1].length).toBe(2);
        expect(pairs[2].length).toBe(2);
    });

    it('array with odd number of elements creates a group with three members', () => {
        const pairs = splitUsersIntoPairs(['1', '2', '3', '4', '5', '6', '7']);

        expect(pairs.length).toBe(3);
        expect(pairs[0].length).toBe(2);
        expect(pairs[1].length).toBe(2);
        expect(pairs[2].length).toBe(3);
    });
});

describe('getCoffeeDates()', () => {
    it('returns an array of coffee date pairs when an array of user IDs is inputted', () => {
        const dates = getCoffeeDates(['U023BECGF', 'U061F7AUR', 'U023EJJWO', 'U061A3ZUR']);
    
        expect(dates.length).toBe(2);
        expect(dates[0].users.length).toBe(2);
        expect(dates[1].users.length).toBe(2);
    });
});
