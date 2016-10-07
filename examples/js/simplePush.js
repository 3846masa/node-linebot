const LineBot = require('@3846masa/linebot/lib/LineBot').LineBot;
const TextMessage = require('@3846masa/linebot/lib/LineMessages').TextMessage;

const bot = new LineBot({
  channelSecret: 'XXXXXXXXXX',
  channelToken: 'XXXXXXXXXX',
});

const message = new TextMessage({
  text: 'Hello World',
});

bot.push('USER_ID', message);
