const getCoffeeDates = require('./index');

test('returns an array of coffee date pairs when an array of user IDs is inputted', () => {
    expect(getCoffeeDates(['U023BECGF', 'U061F7AUR'])).toStrictEqual([{users: ['U023BECGF', 'U061F7AUR']}]);
});
