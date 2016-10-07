@3846masa/linebot
=================

LINE BOT API wrapper for Node.js

------

[![NPM][npm-badge]][npm]
[![LICENSE][license-badge]][license]
[![dependencies][dependencies-badge]][dependencies-david]

[npm]: https://www.npmjs.com/package/@3846masa/linebot
[license]: https://3846masa.mit-license.org
[dependencies-david]: https://david-dm.org/3846masa/linebot?view=list

[npm-badge]: https://img.shields.io/npm/v/@3846masa/linebot.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURcwAAOeIiP////G7u/ri4tIZGdpFReJsbPC3t075sZwAAAAvSURBVCjPY2CgDWAThIMEsACjEhwIUCZg0dGCIqASwMAxMgXAgSzOwMAOC2TqAwBvzR4JxLaP0gAAAABJRU5ErkJggg==
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAVUExURSBTICJcIiNgIiZoJTuhNyt3Kf///%2BCqxSgAAAAGdFJOUwpclbn%2B4Fj6/H8AAAABYktHRAZhZrh9AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AkEEjEV7MDQQwAAAGBJREFUCNc1TUEKgDAMi07vE/Q%2BRD8g%2B4BbvAvi/79iMjDQJm1CC6BbDzRsZI3incIpYeYFhCaYnLiyPYnYkwWZFWoFHrSuttCmmbwXh0eJQYVON4JthZTxCzzAmyb8%2BAAKXBRyN6RyZQAAAABJRU5ErkJggg==
[dependencies-badge]: https://img.shields.io/david/3846masa/linebot.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURcwAAOeIiP////G7u/ri4tIZGdpFReJsbPC3t075sZwAAAAvSURBVCjPY2CgDWAThIMEsACjEhwIUCZg0dGCIqASwMAxMgXAgSzOwMAOC2TqAwBvzR4JxLaP0gAAAABJRU5ErkJggg==

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

See [examples](./examples).

## LICENSE

MIT (c) 3846masa

## Author

![3846masa][3846masa] 3846masa

[3846masa]: https://gravatar.com/avatar/cfeae69aae4f4fc102960f01d35d2d86?s=25
