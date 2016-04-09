import LINE_CONST from './line-const.js';
import { createHmac } from 'crypto';
/**
 * @external { EventEmitter } https://nodejs.org/api/events.html
 */
import { EventEmitter } from 'events';
import axios from 'axios';
import Express from 'express';
import bodyParser from 'body-parser';

/**
 * LINE Bot API wrapper.
 *
 * @example <caption>EventEmitter</caption>
 * const LineBot = require('linebot');
 * const bot = new LineBot(configs);
 *
 * bot.on('message', (result) => {
 *   console.log('You got a message!', result);
 * });
 *
 * bot.listen(3000);
 *
 * @extends { EventEmitter }
 * @see https://developers.line.me/bot-api/api-reference
 */
class LineBot extends EventEmitter {
  /**
   * Constructor
   * @param  { Object } params
   * @param  { string } params.channelID     Channel ID
   * @param  { string } params.channelSecret Channel secret
   * @param  { string } params.MID           MID
   */
  constructor ({ channelID, channelSecret, MID }) {
    super();
    this._init({ channelID, channelSecret, MID });
  }

  /** @private */
  _init ({ channelID, channelSecret, MID }) {
    /**
     * Configuration.
     * @type     { Object }
     * @property { string } botConfig.channelID      Channel ID
     * @property { string } botConfig.channelSecret  Channel secret
     * @property { string } botConfig.MID            MID
     */
    this.botConfig = {
      channelID: channelID,
      channelSecret: channelSecret,
      MID: MID
    };
    Object.freeze(this.botConfig);

    /** @private */
    this._fetcher = axios.create({
      baseURL: 'https://trialbot-api.line.me/',
      headers: {
        'X-Line-ChannelID': this.botConfig.channelID, // Channel ID
        'X-Line-ChannelSecret': this.botConfig.channelSecret, // Channel secret
        'X-Line-Trusted-User-With-ACL': this.botConfig.MID // MID
      }
    });

    /** @private */
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

  /** @private */
  _checkSignature ({ signature, body }) {
    const hmac = createHmac('sha256', this.botConfig.channelSecret);
    hmac.update(body);
    const calcResult = hmac.digest('base64');
    return ( calcResult === signature );
  }

  /**
   * Post text.
   * @see https://developers.line.me/bot-api/api-reference#sending_message_text
   * @param  { Object }         params
   * @param  { string }         [params.user]   MID of user you send to.
   * @param  { Array<string> }  [params.users]  MIDs of users if you send to more than one people.
   * @param  { string }         params.message  Message you send.
   * @return { Promise }
   */
  postText ({ user, users, message }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      text: message,
      contentType: LINE_CONST.CONTENT_TYPE.TEXT
    });
  }

  /**
   * Post image.
   * @see https://developers.line.me/bot-api/api-reference#sending_message_image
   * @param  { Object }         params
   * @param  { string }         [params.user]        MID of user you send to.
   * @param  { Array<string> }  [params.users]       MIDs of users if you send to more than one people.
   * @param  { string }         params.originalUrl   Image URL (JPEG).
   * @param  { string }         params.thumbnailUrl  Thumbnail URL (JPEG).
   * @return { Promise }
   */
  postImage ({ user, users, originalUrl, thumbnailUrl }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      originalContentUrl: originalUrl,
      previewImageUrl: thumbnailUrl,
      contentType: LINE_CONST.CONTENT_TYPE.IMAGE
    });
  }

  /**
   * Post video.
   * @see https://developers.line.me/bot-api/api-reference#sending_message_video
   * @param  { Object }         params
   * @param  { string }         [params.user]        MID of user you send to.
   * @param  { Array<string> }  [params.users]       MIDs of users if you send to more than one people.
   * @param  { string }         params.originalUrl   Video URL (MP4).
   * @param  { string }         params.thumbnailUrl  Thumbnail URL (JPEG).
   * @return { Promise }
   */
  postVideo ({ user, users, originalUrl, thumbnailUrl }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      originalContentUrl: originalUrl,
      previewImageUrl: thumbnailUrl,
      contentType: LINE_CONST.CONTENT_TYPE.VIDEO
    });
  }

  /**
   * Post audio.
   * @see https://developers.line.me/bot-api/api-reference#sending_message_audio
   * @param  { Object }         params
   * @param  { string }         [params.user]         MID of user you send to.
   * @param  { Array<string> }  [params.users]        MIDs of users if you send to more than one people.
   * @param  { string }         params.originalUrl    Audio URL (M4A).
   * @param  { string }         params.audioMillisec  Audio length (milliseconds).
   * @return { Promise }
   */
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

  /**
   * Post location.
   * @see https://developers.line.me/bot-api/api-reference#sending_message_location
   * @param  { Object }         params
   * @param  { string }         [params.user]        MID of user you send to.
   * @param  { Array<string> }  [params.users]       MIDs of users if you send to more than one people.
   * @param  { string }         params.locationName  Name of location.
   * @param  { string }         params.latitude      Latitude of location.
   * @param  { string }         params.longitude     Longitude of location.
   * @return { Promise }
   */
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

  /**
   * Post Sticker.
   * @see https://developers.line.me/bot-api/api-reference#sending_message_location
   * @param  { Object }         params
   * @param  { string }         [params.user]    MID of user you send to.
   * @param  { Array<string> }  [params.users]   MIDs of users if you send to more than one people.
   * @param  { string }         params.stkid     ID of the sticker.
   * @param  { string }         params.stkpkgid  Package ID of the sticker.
   * @param  { string }         [params.stkver]  Version number of the sticker.
   * @return { Promise }
   */
  postSticker ({ user, users, stkid, stkpkgid, stkver }) {
    return this._postMessage({
      userList: (users) ? users : [ user ],
      contentMetadata: {
        STKID: stkid.toString(),
        STKPKGID: stkpkgid.toString(),
        STKVER: (stkver) ? stkver.toString() : undefined
      },
      contentType: LINE_CONST.CONTENT_TYPE.STICKER
    });
  }

  /**
   * Post content you make.
   * @param  { Array<string> | string }  users    MIDs of users if you send to more than one people.
   * @param  { Object }                  content  https://developers.line.me/bot-api/api-reference#sending_message
   * @return { Promise }
   */
  postContent (users, content) {
    const args = Object.assign(content, {
      userList: (Array.isArray(users)) ? users : [ users ]
    });
    return this._postMessage(args);
  }

  /** @private */
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

  /**
   * Fetch user profile from MID.
   * @param  { string }           MID  MID of user.
   * @return { Promise<Object> }       Return user profile.
   */
  fetchProfileFromMID ( MID ) {
    return this.fetchProfileFromMIDList([ MID ])
    .then((contacts) => contacts[0])
    .catch((err) => {
      console.error(err.stack);
      return Promise.reject(err);
    });
  }

  /**
   * Fetch user profile from MID.
   * @param  { Array<string> }    MIDList  MIDs of users.
   * @return { Promise<Object> }           Return user profile.
   */
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

  /**
   * Binds and listens for connections on the specified host and port.
   * @see http://expressjs.com/en/4x/api.html#app.listen
   * @param { ...any }  params  http://expressjs.com/en/4x/api.html#app.listen
   */
  listen (...params) {
    this._express.listen(...params);
  }

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   * @see https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
   * @param  { ...any } params   https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
   * @listens { message }        Listen message. https://developers.line.me/bot-api/api-reference#sending_message
   * @listens { operation }      Listen operation. https://developers.line.me/bot-api/api-reference#receiving_operations
   */
  on (...params) {
    super.on(...params);
  }

  /**
   * Constant.
   * @type     { Object }
   * @property { string }  CONST.SEND_MESSAGE             '138311608800106203'
   * @property { string }  CONST.EVENT_TYPE.MESSAGE       '138311609000106303'
   * @property { string }  CONST.EVENT_TYPE.OPERATION     '138311609100106403'
   * @property { number }  CONST.OP_TYPE.ADD_FRIEND       4
   * @property { number }  CONST.OP_TYPE.BLOCKED_ACCOUNT  8
   * @property { number }  CONST.CONTENT_TYPE.TEXT        1
   * @property { number }  CONST.CONTENT_TYPE.IMAGE       2
   * @property { number }  CONST.CONTENT_TYPE.VIDEO       3
   * @property { number }  CONST.CONTENT_TYPE.AUDIO       4
   * @property { number }  CONST.CONTENT_TYPE.LOCATION    7
   * @property { number }  CONST.CONTENT_TYPE.STICKER     8
   * @property { number }  CONST.CONTENT_TYPE.CONTACT     10
   */
  static get CONST () {
    return LINE_CONST;
  }
}

export default LineBot;
