node-linebot
=======

## Install

```sh
npm install --save @3846masa/linebot
```

## Usage

```javascript
const LineBot = require('@3846masa/linebot');
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
