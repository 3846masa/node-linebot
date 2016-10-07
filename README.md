node-linebot
=======

[![NPM](https://nodei.co/npm/@3846masa%2Flinebot.png?mini=true)](https://nodei.co/npm/@3846masa%2Flinebot/)

## Docs

https://3846masa.github.io/node-linebot/

## Install

```sh
npm install --save @3846masa/linebot
```

## Usage

```javascript
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

## LICENSE

MIT (c) 3846masa

## Author

![3846masa][3846masa] 3846masa

[3846masa]: https://gravatar.com/avatar/cfeae69aae4f4fc102960f01d35d2d86?s=25
