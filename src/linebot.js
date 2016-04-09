import LINE_CONST from './line-const.js';
import { createHmac } from 'crypto';
import { EventEmitter } from 'events';
import axios from 'axios';
import Express from 'express';
import bodyParser from 'body-parser';

class LineBot extends EventEmitter {
  constructor ({ channelID, channelSecret, MID }) {
    super();
    this._init({ channelID, channelSecret, MID });
  }

  _init ({ channelID, channelSecret, MID }) {
    this.botConfig = {
      channelID: channelID,
      channelSecret: channelSecret,
      MID: MID
    };
    Object.freeze(this.botConfig);

    this._fetcher = axios.create({
      baseURL: 'https://trialbot-api.line.me/',
      headers: {
        'X-Line-ChannelID': this.botConfig.channelID, // Channel ID
        'X-Line-ChannelSecret': this.botConfig.channelSecret, // Channel secret
        'X-Line-Trusted-User-With-ACL': this.botConfig.MID // MID
      }
    });

    this._express = Express();

    this._express.use(bodyParser.raw({ type: '*/*' }));

    this._express.use((req, res, next) => {
      const isValid = this._checkSignature({
        signature: req.header('X-LINE-ChannelSignature'),
        body: req.body
      });
      if (!isValid) return next(new Error('Invalid request.'));
      else return next();
    });

    this._express.use((req, res, next) => {
      Promise.resolve(req.body.toString('utf8'))
        .then(JSON.parse)
        .then((json) => { req.json = json; })
        .then(next).catch(next);
    });

    this._express.all('*', (req, res, next) => {
      if (!req.json || !req.json.result) {
        return next(new Error('Invalid JSON'));
      }
      res.status(200);
      this.emit('receive', req.json.result);
      for (let result of req.json.result) {
        if (result.eventType === LINE_CONST.EVENT_TYPE.MESSAGE) {
          this.emit('message', result);
        }
        if (result.eventType === LINE_CONST.EVENT_TYPE.OPERATION) {
          this.emit('operation', result);
        }
      }
      next();
    });

    this._express.use(function(err, req, res, next) {
      res.status(400);
      next();
    });
  }

  _checkSignature ({ signature, body }) {
    const hmac = createHmac('sha256', this.botConfig.channelSecret);
    hmac.update(body);
    const calcResult = hmac.digest('base64');
    return ( calcResult === signature );
  }

  postText ({ user, users, message }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      text: message,
      contentType: LINE_CONST.CONTENT_TYPE.TEXT
    });
  }

  postImage ({ user, users, originalUrl, thumbnailUrl }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      originalContentUrl: originalUrl,
      previewImageUrl: thumbnailUrl,
      contentType: LINE_CONST.CONTENT_TYPE.IMAGE
    });
  }

  postVideo ({ user, users, originalUrl, thumbnailUrl }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      originalContentUrl: originalUrl,
      previewImageUrl: thumbnailUrl,
      contentType: LINE_CONST.CONTENT_TYPE.VIDEO
    });
  }

  postAudio ({ user, users, originalUrl, audioMillisec }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      originalContentUrl: originalUrl,
      contentMetadata: {
        AUDLEN: audioMillisec
      },
      contentType: LINE_CONST.CONTENT_TYPE.AUDIO
    });
  }

  postLocation ({ user, users, locationName, latitude, longitude }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      text: locationName,
      location: {
        title: locationName,
        latitude: latitude,
        longitude: longitude
      },
      contentType: LINE_CONST.CONTENT_TYPE.LOCATION
    });
  }

  postSticker ({ user, users, stkid, stkpkgid, stkver }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      contentMetadata: {
        STKID: stkid.toString(),
        STKPKGID: stkpkgid.toString(),
        STKVER: stkver.toString()
      },
      contentType: LINE_CONST.CONTENT_TYPE.STICKER
    });
  }

  postContent (users, content) {
    const args = Object.assign(content, {
      userList: (Array.isArray(users)) ? users : [ users ]
    });
    return this._postMessage(args);
  }

  _postMessage ({
    userList, text, contentMetadata,
    contentType = LINE_CONST.CONTENT_TYPE.TEXT,
    originalContentUrl, previewImageUrl, location
  }) {
    return this._fetcher.post('/v1/events', {
      to: userList,
      toChannel: 1383378250,
      eventType: LINE_CONST.SEND_MESSAGE,
      content: {
        contentType: contentType,
        toType: 1,
        text: text,
        originalContentUrl: originalContentUrl,
        previewImageUrl: previewImageUrl,
        location: location,
        contentMetadata: contentMetadata
      }
    })
    .catch((err) => {
      console.error(err.stack);
      return Promise.reject(err);
    });
  }

  fetchProfileFromMID ( MID ) {
    return this.fetchProfileFromMIDList([ MID ])
    .then((contacts) => contacts[0])
    .catch((err) => {
      console.error(err.stack);
      return Promise.reject(err);
    });
  }

  fetchProfileFromMIDList ( MIDList ) {
    return this._fetcher.get('/v1/profiles', {
      params: {
        mids: MIDList.join(',')
      }
    })
    .then((res) => res.data.contacts)
    .catch((err) => {
      console.error(err.stack);
      return Promise.reject(err);
    });
  }

  listen (port = 3000, cb) {
    this._express.listen(port, cb);
  }

  static get CONST () {
    return LINE_CONST;
  }
}

export default LineBot;
