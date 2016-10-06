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
import { LineBot } from '@3846masa/linebot';
const bot = new LineBot({
  channelID: 'xxxxxxx',
  channelSecret: 'xxxxxx',
  MID: 'xxxxxx'
});

bot.on('message', (res) => {
  const content = res.content;
  if ( content.contentType === LineBot.CONST.CONTENT_TYPE.TEXT ) {
    bot.postMessage({
      user: content.from,
      message: content.text
    });
  } else {
    bot.postMessage({
      user: content.from,
      message: 'Not text.'
    });
  }
});

bot.listen(3000);
```

## LICENSE

MIT (c) 3846masa
