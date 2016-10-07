const LineBot = require('../../lib/LineBot').LineBot;
const TextMessage = require('../../lib/LineMessages').TextMessage;

const bot = new LineBot({
  channelSecret: 'XXXXXXXXXX',
  channelToken: 'XXXXXXXXXX',
});

const message = new TextMessage({
  text: 'Hello World',
});

bot.push('USER_ID', message);
