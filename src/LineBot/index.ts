/* eslint-disable no-unused-vars */
import { createHmac } from 'crypto';
import { EventEmitter2 } from 'eventemitter2';
import { Readable as ReadableStream } from 'stream';
import axios, { AxiosInstance } from 'axios';
import express from 'express';
import { Express, Request, Response, NextFunction } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { LineMessage } from '../LineMessages';
import { LineEvent } from '../LineEvents';
import { UserSource, GroupSource, RoomSource } from '../LineSources';
/* eslint-enable no-unused-vars */

/* eslint-disable no-undef */
export interface LineBotConfig {
  channelSecret: string,
  channelToken: string,
}
export interface LineProfile {
  displayName: string,
  userId: string,
  pictureUrl: string,
  statusMessage: string,
}
/* eslint-enable no-undef */

/* global LineBotConfig, LineProfile */
/**
 * @typedef   {Object} LineBotConfig
 * @property  {String} channelSecret  Channel secret
 * @property  {String} channelToken   Channel token
 */
/**
 * @typedef   {Object} LineProfile
 * @property  {String} displayName    Display name
 * @property  {String} userId         User ID
 * @property  {String} pictureUrl     Image URL
 * @property  {String} statusMessage  Status message
 */

/**
 * LINE Bot API wrapper.
 *
 * @example <caption>EventEmitter</caption>
 * import { LineBot } from '@3846masa/linebot';
 * const bot = new LineBot(configs);
 *
 * bot.on('message', (result) => {
 *   console.log('You got a message!', result);
 * });
 *
 * bot.listen(3000);
 *
 * @extends {EventEmitter}
 * @see https://devdocs.line.me/ja/
 */
export class LineBot extends EventEmitter2 {
  /* eslint-disable no-undef */
  public config: LineBotConfig;
  public express: express.Express;
  private _axios: AxiosInstance;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param  {LineBotConfig} config
   */
  constructor({ channelSecret, channelToken }: LineBotConfig) {
    super({
      wildcard: true,
      delimiter: ':',
      maxListeners: 20,
    });
    /**
     * Configuration.
     * @type {LineBotConfig}
     */
    this.config = {
      channelSecret,
      channelToken,
    };
    Object.freeze(this.config);
    this._initAxios();
    this._initExpress();
  }

  /** @private */
  private _initAxios() {
    /** @private */
    this._axios = axios.create({
      baseURL: 'https://api.line.me/v2/bot/',
      headers: {
        Authorization: `Bearer ${this.config.channelToken}`,
      },
      validateStatus: () => true,
    });
  }

  /** @private */
  private _initExpress() {
    /**
     * Configuration.
     * @type {Express.Application}
     */
    this.express = express();

    this.express.use(bodyParser.raw({ type: () => true }));

    this.express.use((req, res, next) => {
      const isValid = this._checkSignature({
        signature: req.header('X-Line-Signature'),
        body: req.body,
      });
      if (!isValid) {
        return next(new Error('Invalid request.'));
      }
      return next();
    });

    this.express.use((req, res, next) => {
      Promise.resolve(req.body.toString('utf8'))
        .then(JSON.parse)
        .then(json => Object.assign(req, { body: json }))
        .then(() => next())
        .catch(next);
    });

    this.express.all('*', (req, res, next) => {
      if (!req.body || !req.body.events) {
        return next(new Error('Invalid JSON.'));
      }

      for (const event of req.body.events) {
        const eventObj = LineEvent.createFromObject(event);
        this.emit(`webhook:${event.type}`, eventObj);
      }
      res.status(200).send();
      return next();
    });

    this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(400).send({ error: err.message });
      next();
    });
  }

  /** @private */
  private _checkSignature({ signature, body }: { signature: string, body: any }) {
    const hmac = createHmac('sha256', this.config.channelSecret);
    hmac.update(body);
    const calcResult = hmac.digest('base64');
    return (calcResult === signature);
  }

  /**
   * Send messages to users, groups, and rooms at any time.
   * @see https://devdocs.line.me/en/#push-message
   * @param  {string}                            to   ID of the receiver
   * @param  {LineMessage[] | LineMessage | any} msg  Messages (Max: 5)
   * @return {Promise<void,Error>}
   */
  public push(to: string, msg: LineMessage[] | LineMessage | any) {
    let messages: any[];
    if (!Array.isArray(msg)) {
      messages = [msg];
    } else {
      messages = msg;
    }

    const promise = this._post('/message/push', { to, messages });
    return promise.then(({ status, data }: { status: number, data: any }): Promise<void> => {
      if (status !== 200) {
        return Promise.reject(new Error(`${status}: ${data.message}`));
      }
      return Promise.resolve();
    });
  }

  /**
   * Retrieve image, video, and audio data sent by users.
   * @see https://devdocs.line.me/en/#get-content
   * @param  {LineMessage} message Message
   * @return {Promise<stream.Readable,Error>}
   */
  public getContentFromMessage(message: LineMessage) {
    return this.getContent(message.id);
  }

  /**
   * Retrieve image, video, and audio data sent by users.
   * @see https://devdocs.line.me/en/#get-content
   * @param  {string} messageId Message ID.
   * @return {Promise<stream.Readable,Error>}
   */
  public getContent(messageId: string) {
    const promise = this._get(`/message/${messageId}/content`, {
      responseType: 'stream',
    });
    return promise.then(({ status, statusText, data }: {
      status: number,
      statusText: string,
      data: ReadableStream,
    }): Promise<ReadableStream> => {
      if (status !== 200) {
        throw new Error(`${status}: ${statusText}`);
      }
      return Promise.resolve(data);
    });
  }

  /**
   * Send messages to users, groups, and rooms at any time.
   * @see https://devdocs.line.me/en/#bot-api-get-profile
   * @param  {UserSource} user  User source
   * @return {Promise<LineProfile,Error>}
   */
  public getProfileFromUserSource(user: UserSource) {
    return this.getProfile(user.userId);
  }

  /**
   * Send messages to users, groups, and rooms at any time.
   * @see https://devdocs.line.me/en/#bot-api-get-profile
   * @param  {string} userId  User ID
   * @return {Promise<LineProfile,Error>}
   */
  public getProfile(userId: string) {
    const promise = this._get(`/profile/${userId}`);
    return promise.then(({ status, data }: { status: number, data: any }): Promise<LineProfile> => {
      if (status !== 200) {
        throw new Error(`${status}: ${data.message}`);
      }
      return Promise.resolve(<LineProfile> data);
    });
  }

  /**
   * Leave a group or room.
   * @see https://devdocs.line.me/en/#leave
   * @param  {GroupSource | RoomSource}  source
   * @return {Promise<void,Error>}
   */
  public leaveFromSource(source: GroupSource | RoomSource): Promise<void> {
    if (source instanceof GroupSource) {
      return this.leave('group', source.groupId);
    } else if (source instanceof RoomSource) {
      return this.leave('room', source.roomId);
    }
    return Promise.resolve();
  }

  /**
   * Leave a group or room.
   * @see https://devdocs.line.me/en/#leave
   * @param  {string} type
   * @param  {string} id
   * @return {Promise<void,Error>}
   */
  public leave(type: string, id: string) {
    const promise = this._post(`/${type}/${id}/leave`);
    return promise.then(({ status, data }: { status: number, data: any }): Promise<void> => {
      if (status !== 200) {
        return Promise.reject(new Error(`${status}: ${data.message}`));
      }
      return Promise.resolve();
    });
  }

  /** @private */
  public _get(endpoint: string, options?: any) {
    return <Promise<any>> this._axios.get(endpoint, options || {});
  }

  /** @private */
  public _post(endpoint: string, data?: any, options?: any) {
    return <Promise<any>> this._axios.post(endpoint, data, options || {});
  }

  /**
   * Binds and listens for connections on the specified host and port.
   * @see http://expressjs.com/en/4x/api.html#app.listen
   * @param  { ...any }    args http://expressjs.com/en/4x/api.html#app.listen
   * @return {http.Server}
   */
  listen(...args: any[]) {
    return this.express.listen.call(this.express, ...args);
  }

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   * @see https://github.com/asyncly/EventEmitter2#emitteronevent-listener
   * @param   {string | string[]} event    Event name
   * @param   {Function}          listener Listener function
   * @return  {LineBot}
   * @listens {webhook:{eventType}}  Listen message event. https://developers.line.me/bot-api/api-reference#sending_message
   */
  on(event: string | string[], listener: Function) {
    super.on(event, listener);
    return this;
  }
}

export default LineBot;
