import { LineBot } from '../../lib/LineBot';
import { TextMessage } from '../../lib/LineMessages';

const bot = new LineBot({
  channelSecret: 'XXXXXXXXXX',
  channelToken: 'XXXXXXXXXX',
});

const message = new TextMessage({
  text: 'Hello World',
});

bot.push('USER_ID', message);
