const LineBot = require('../../lib/LineBot').LineBot;

const bot = new LineBot({
  channelSecret: 'XXXXXXXXXX',
  channelToken: 'XXXXXXXXXX',
});

bot.on('webhook:*', (ev) => {
  console.log('You got a event!', ev);
});

bot.on('webhook:message', (ev) => {
  const message = ev.message;
  ev.reply(message);
});

bot.listen(process.env.PORT || 3000);
