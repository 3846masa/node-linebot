linebot
=======

## Usage

```javascript
const LineBot = require('linebot');
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
