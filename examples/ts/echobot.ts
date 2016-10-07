import { LineBot } from '../../lib/LineBot';
import { LineEvent, MessageEvent } from '../../lib/LineEvents';

const bot = new LineBot({
  channelSecret: 'XXXXXXXXXX',
  channelToken: 'XXXXXXXXXX',
});

bot.on('webhook:*', (ev: LineEvent) => {
  console.log('You got a event!', ev);
});

bot.on('webhook:message', (ev: MessageEvent) => {
  const message = ev.message;
  ev.reply(message);
});

bot.listen(process.env.PORT || 3000);
