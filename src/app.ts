const shuffle = require('shuffle-array');

interface CoffeeDate {
    users: string[];
}

function splitUsersIntoPairs(users: string[]): Array<string[]> {
    shuffle(users);
    const numOfPairs = Math.ceil(users.length / 2);

    let pairs = [...Array(numOfPairs)].map((value, index) => {
        return users.slice(index * 2, (index + 1) * 2);
    });

    if (pairs.slice(-1).pop()?.length == 1) {
        pairs[pairs.length - 2] = [...pairs[pairs.length - 2], ...pairs[pairs.length - 1]];
        pairs.pop();
    }

    return pairs;
}

function getCoffeeDates(users: string[]): CoffeeDate[] {
    const pairs = splitUsersIntoPairs(users);

    return pairs.map(pair => {
        return {users: pair}
    });
}

module.exports = { getCoffeeDates, splitUsersIntoPairs };
