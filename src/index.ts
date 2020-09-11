const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const shuffle = require('shuffle-array');

const web = new WebClient(process.env.SLACK_TOKEN);

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

const port = process.env.PORT || 3000;

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

function postMessage(channel: string, text: string): void {
    (async () => {
        try {
            await web.chat.postMessage({
                channel: channel,
                text: text,
                icon_emoji: ':coffee:',
                username: 'Coffee Date',
            });
        } catch (error) {
            console.log(error);
        }

        console.log('Message posted!');
    })();
}

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
    console.log(`Listening for events on ${port}`);
});

module.exports = { getCoffeeDates, splitUsersIntoPairs };
