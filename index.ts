const { WebClient } = require('@slack/web-api');

const web = new WebClient(process.env.SLACK_TOKEN);

function getCoffeeDates(users: Array<string>): Array<object> {
    return [{users: users}];
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

module.exports = getCoffeeDates;
