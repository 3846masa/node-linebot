# Examples

## Echo
```js
const LineBot = require('@3846masa/linebot/lib/LineBot').LineBot;

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
```

## Push message

### Simple
```js
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
```
