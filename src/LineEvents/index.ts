/* eslint-disable no-unused-vars */
import { LineBot } from '../LineBot';
import { LineSource } from '../LineSources';
import { LineMessage } from '../LineMessages';
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars, space-infix-ops */
export type LineEventType = 'message' | 'follow' | 'join' | 'leave' | 'postback' | 'beacon';
export namespace LineEventType {
  export const MESSAGE: LineEventType = 'message';
  export const FOLLOW: LineEventType = 'follow';
  export const JOIN: LineEventType = 'join';
  export const LEAVE: LineEventType = 'leave';
  export const POSTBACK: LineEventType = 'postback';
  export const BEACON: LineEventType = 'beacon';
}

export type BeaconEventType = 'enter';
export namespace BeaconEventType {
  export const ENTER: BeaconEventType = 'enter';
}
/* eslint-enable no-unused-vars, space-infix-ops */

/**
 * @see https://devdocs.line.me/en/#webhook-event-object
 */
export class LineEvent {
  /* eslint-disable no-undef */
  public type: string;
  public timestamp: Date;
  public source: LineSource;
  /* eslint-enable no-undef */

  /** @ignore */
  constructor(
    { type, timestamp, source }: {
      type: string,
      timestamp: number | Date,
      source: any,
    }
  ) {
    /**
     * Identifier for the type of event
     * @type {string}
     */
    this.type = type;
    /**
     * Time of the event in milliseconds
     * @type {Date}
     */
    this.timestamp = new Date(Number(timestamp));
    /**
     * Object which contains the source of the event
     * @type {LineSource}
     */
    this.source = LineSource.createFromObject(source);
  }

  /** @ignore */
  static createFromObject(params: any, _linebot?: LineBot) {
    Object.assign(params, { _linebot });

    switch (params.type) {
      case LineEventType.MESSAGE: {
        return new MessageEvent(params);
      }
      case LineEventType.FOLLOW: {
        return new FollowEvent(params);
      }
      case LineEventType.JOIN: {
        return new JoinEvent(params);
      }
      case LineEventType.LEAVE: {
        return new LeaveEvent(params);
      }
      case LineEventType.POSTBACK: {
        return new PostbackEvent(params);
      }
      case LineEventType.BEACON: {
        return new BeaconEvent(params);
      }
      default: {
        return new LineEvent({
          type: params.type,
          timestamp: params.timestamp,
          source: params.source,
        });
      }
    }
  }
}

/**
 * Replyable event.
 */
export class ReplyableEvent extends LineEvent {
  /* eslint-disable no-undef */
  public replyToken: string;
  private _linebot: LineBot;
  /* eslint-enable no-undef */

  /** @ignore */
  constructor(
    { type, timestamp, source, replyToken, _linebot = undefined }: {
      type: string,
      timestamp: number | Date,
      source: any,
      replyToken: string,
      _linebot?: LineBot,
    }
  ) {
    super({ type, timestamp, source });
    /**
     * Token for replying to this event
     * @type {string}
     */
    this.replyToken = replyToken;
    /** @ignore */
    Object.defineProperty(this, '_linebot', {
      writable: true,
      value: _linebot,
    });
  }

  /**
   * Respond to events from users, groups, and rooms.
   * @see https://devdocs.line.me/en/#reply-message
   * @param  {LineMessage[] | LineMessage | any} msg  Message like LineMessage.
   * @return {Promise<void,Error>}
   */
  reply(msg: LineMessage[] | LineMessage | any) {
    let messages: any[];
    if (!Array.isArray(msg)) {
      messages = [msg];
    } else {
      messages = msg;
    }

    const promise = this._linebot._post('/message/reply', {
      replyToken: this.replyToken,
      messages,
    });
    return promise.then(({ status, data }: { status: number, data: any }) => {
      if (status !== 200) {
        return Promise.reject(new Error(`${status}: ${data.message}`));
      }
      return Promise.resolve();
    });
  }
}

/**
 * @see https://devdocs.line.me/en/#message-event
 */
export class MessageEvent extends ReplyableEvent {
  /* eslint-disable no-undef */
  public message: LineMessage;
  /* eslint-enable no-undef */

  /** @ignore */
  constructor(
    { type, timestamp, source, replyToken, message, _linebot = undefined }: {
      type: string,
      timestamp: number | Date,
      source: LineSource,
      replyToken: string,
      message: any,
      _linebot?: LineBot,
    }
  ) {
    super({ type, timestamp, source, replyToken, _linebot });
    /**
     * Contents of the message
     * @type  {LineMessage | any}
     */
    this.message = LineMessage.createFromObject(message);
  }
}

/**
 * @see https://devdocs.line.me/en/#follow-event
 */
export class FollowEvent extends ReplyableEvent {
}

/**
 * @see https://devdocs.line.me/en/#unfollow-event
 */
export class UnfollowEvent extends LineEvent {
}

/**
 * @see https://devdocs.line.me/en/#join-event
 */
export class JoinEvent extends ReplyableEvent {
}

/**
 * @see https://devdocs.line.me/en/#leave-event
 */
export class LeaveEvent extends LineEvent {
}

/**
 * @see https://devdocs.line.me/en/#postback-event
 */
export class PostbackEvent extends ReplyableEvent {
  /* eslint-disable no-undef */
  public postback: { data: string };
  /* eslint-enable no-undef */

  /** @ignore */
  constructor(
    { type, timestamp, source, replyToken, postback, _linebot = undefined }: {
      type: string,
      timestamp: number | Date,
      source: LineSource,
      replyToken: string,
      postback: { data: string },
      _linebot?: LineBot,
    }
  ) {
    super({ type, timestamp, source, replyToken, _linebot });
    /**
     * Postback data
     * @type     {Object}
     * @property {string} postback.data  Postback data
     */
    this.postback = postback;
  }
}

/**
 * @see https://devdocs.line.me/en/#beacon-event
 */
export class BeaconEvent extends ReplyableEvent {
  /* eslint-disable no-undef */
  public beacon: {
    hwid: string,
    type: BeaconEventType,
  };
  /* eslint-enable no-undef */

  /** @ignore */
  constructor(
    { type, timestamp, source, replyToken, beacon, _linebot = undefined }: {
      type: string,
      timestamp: number | Date,
      source: LineSource,
      replyToken: string,
      beacon: {
        hwid: string,
        type: BeaconEventType,
      },
      _linebot?: LineBot,
    }
  ) {
    super({ type, timestamp, source, replyToken, _linebot });
    /**
     * Beacon data
     * @type     {Object}
     * @property {string} beacon.hwid  Hardware ID of the beacon that was detected
     * @property {string} beacon.type  Type of beacon event
     */
    this.beacon = beacon;
  }
}
