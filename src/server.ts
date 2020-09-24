const { App } = require('@slack/bolt');
const { getCoffeeDates } = require('./app');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_TOKEN,
});

// The hello command simply responds with "Hello, {user}!"
app.command('/hello', async ({ command, ack, say }: any) => {
    await ack();
    await say(`Hello, <@${command.user_id}>!`);
});

app.command('/coffee_date', async({ command, ack, say }: any) => {
    await ack();
    if (command.text == 'match') {
        const response = await app.client.conversations.members({
            token: process.env.SLACK_TOKEN,
            channel: command.channel_id,
            limit: 200
        });
        const dates = getCoffeeDates(response.members);

        let message = 'Here are the coffee dates for this round:\n'
            .concat(dates.map((date: any): any => {
                if (date.users.length == 2) {
                    return `<@${date.users[0]}> and <@${date.users[1]}>\n`;
                } else if (date.users.length == 3) {
                    return `<@${date.users[0]}>, <@${date.users[1]}>, and <@${date.users[2]}>\n`;
                }
            }));

        console.log(message);
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();
