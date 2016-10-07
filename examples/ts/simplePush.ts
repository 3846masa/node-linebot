import { LineBot } from '@3846masa/linebot/lib/LineBot';
import { TextMessage } from '@3846masa/linebot/lib/LineMessages';

const bot = new LineBot({
  channelSecret: 'XXXXXXXXXX',
  channelToken: 'XXXXXXXXXX',
});

const message = new TextMessage({
  text: 'Hello World',
});

bot.push('USER_ID', message);
