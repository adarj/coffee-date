const { getCoffeeDates, splitUsersIntoPairs } = require('./index');

test('getCoffeeDates() - returns an array of coffee date pairs when an array of user IDs is inputted', () => {
    const dates = getCoffeeDates(['U023BECGF', 'U061F7AUR', 'U023EJJWO', 'U061A3ZUR']);

    expect(dates.length).toBe(2);
    expect(dates[0].users.length).toBe(2);
    expect(dates[1].users.length).toBe(2);
});

test('splitUsersIntoPairs() - splits array into an array of randomized pairs of two elements', () => {
    expect(splitUsersIntoPairs(['1', '2', '3', '4', '5', '6'])[0].length).toBe(2);
});
