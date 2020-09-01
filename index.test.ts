const { getCoffeeDates, splitUsersIntoPairs } = require('./index');

test('getCoffeeDates() - returns an array of coffee date pairs when an array of user IDs is inputted', () => {
    expect(getCoffeeDates(['U023BECGF', 'U061F7AUR'])).toStrictEqual([{users: ['U023BECGF', 'U061F7AUR']}]);
});

test('splitUsersIntoPairs() - splits array into an array of randomized pairs of two elements', () => {
    expect(splitUsersIntoPairs(['1', '2', '3', '4', '5', '6'])[0].length).toBe(2);
});
