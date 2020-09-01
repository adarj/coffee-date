const { WebClient } = require('@slack/web-api');
const shuffle = require('shuffle-array');

const web = new WebClient(process.env.SLACK_TOKEN);

interface CoffeeDate {
    users: string[];
}

function splitUsersIntoPairs(users: string[]): Array<string[]> {
    shuffle(users);
    const numOfPairs = Math.ceil(users.length / 2);

    return [...Array(numOfPairs)].map((value, index) => {
        return users.slice(index * 2, (index + 1) * 2);
    });
}

function getCoffeeDates(users: string[]): CoffeeDate[] {
    const pairs = splitUsersIntoPairs(users);
    return pairs.map(pair => {
        return {users: pair}
    });
}

(async () => {
    try {
        await web.chat.postMessage({
            channel: '#coffee-dates',
            text: 'I have attained sentience.',
            icon_emoji: ':coffee:',
            username: 'Coffee Date',
        });
    } catch (error) {
        console.log(error);
    }

    console.log('Message posted!');
})();

module.exports = { getCoffeeDates, splitUsersIntoPairs };
