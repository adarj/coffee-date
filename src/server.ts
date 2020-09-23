const { App } = require('@slack/bolt');

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
        const members = await app.client.conversations.members({
            channel: command.channel_id
        });
        console.log(members);
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();
