/* eslint-disable no-unused-vars */
import { ImagemapAction } from '../LineActions';
import { TemplateComponent } from '../LineTemplates';
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars, space-infix-ops */
export type LineMessageType =
  'text' | 'image' | 'video' | 'audio' | 'location' | 'sticker' | 'imagemap' | 'template';
export namespace LineMessageType {
  export const TEXT: LineMessageType = 'text';
  export const IMAGE: LineMessageType = 'image';
  export const VIDEO: LineMessageType = 'video';
  export const AUDIO: LineMessageType = 'audio';
  export const LOCATION: LineMessageType = 'location';
  export const STICKER: LineMessageType = 'sticker';
  export const IMAGEMAP: LineMessageType = 'imagemap';
  export const TEMPLATE: LineMessageType = 'template';
}
/* eslint-enable no-unused-vars, space-infix-ops */

/* eslint-disable no-undef */
export interface Size {
  width: number,
  height: number,
}
/* eslint-enable no-undef */

/**
 * @typedef   {Object} Size
 * @property  {number} width
 * @property  {number} height
 */

/**
 * Line Message
 * @see https://devdocs.line.me/en/#send-message-object
 */
export class LineMessage {
  /* eslint-disable no-undef */
  public id: string;
  public type: LineMessageType;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]    Message ID.
   * @param {string} params.type  Identifier for the type of message.
   */
  constructor({ id = null, type }: { id?: string, type: LineMessageType }) {
    /**
    * Message ID.
    * @type {string}
    */
    this.id = id;
    /**
     * Identifier for the type of source.
     * @type {string}
     */
    this.type = type;
  }

  /** @private */
  static createFromObject(params: any) {
    switch (params.type) {
      case LineMessageType.TEXT: {
        return new TextMessage(params);
      }
      case LineMessageType.IMAGE: {
        return new ImageMessage(params);
      }
      case LineMessageType.VIDEO: {
        return new VideoMessage(params);
      }
      case LineMessageType.AUDIO: {
        return new AudioMessage(params);
      }
      case LineMessageType.LOCATION: {
        return new LocationMessage(params);
      }
      case LineMessageType.STICKER: {
        return new StickerMessage(params);
      }
      default: {
        return new LineMessage({ id: params.id, type: params.type });
      }
    }
  }
}

/**
 * @see https://devdocs.line.me/en/#text-message
 */
export class TextMessage extends LineMessage {
  /* eslint-disable no-undef */
  public text: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]    Message ID.
   * @param {string} params.type  Identifier for the type of message.
   * @param {string} params.text  Message text.
   */
  constructor(
    { id = null, type, text }: {
      id?: string,
      type: LineMessageType,
      text: string,
    }
  ) {
    super({ id, type });
    /**
    * Message text.
    * @type {string}
    */
    this.text = text;
  }
}

/**
 * @see https://devdocs.line.me/en/#image-message
 */
export class ImageMessage extends LineMessage {
  /* eslint-disable no-undef */
  public originalContentUrl: string;
  public previewImageUrl: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]                  Message ID.
   * @param {string} params.type                Identifier for the type of message.
   * @param {string} [params.originalContentUrl]  Image URL. (JPEG / HTTPS)
   * @param {string} [params.previewImageUrl]     Preview image URL. (JPEG / HTTPS)
   */
  constructor(
    { id = null, type, originalContentUrl = null, previewImageUrl = null }: {
      id?: string,
      type: LineMessageType,
      originalContentUrl?: string,
      previewImageUrl?: string,
    }
  ) {
    super({ id, type });
    /**
     * Image URL. (JPEG / HTTPS)
     * @type {string}
     */
    this.originalContentUrl = originalContentUrl;
    /**
     * Preview image URL. (JPEG / HTTPS)
     * @type {string}
     */
    this.previewImageUrl = previewImageUrl;
  }
}

/**
 * @see https://devdocs.line.me/en/#video-message
 */
export class VideoMessage extends LineMessage {
  /* eslint-disable no-undef */
  public originalContentUrl: string;
  public previewImageUrl: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]                  Message ID.
   * @param {string} params.type                Identifier for the type of message.
   * @param {string} [params.originalContentUrl]  URL of video file. (MP4 / HTTPS)
   * @param {string} [params.previewImageUrl]     Preview image URL. (JPEG / HTTPS)
   */
  constructor(
    { id = null, type, originalContentUrl = null, previewImageUrl = null }: {
      id?: string,
      type: LineMessageType,
      originalContentUrl?: string,
      previewImageUrl?: string,
    }
  ) {
    super({ id, type });
    /**
     * URL of video file. (MP4 / HTTPS)
     * @type {string}
     */
    this.originalContentUrl = originalContentUrl;
    /**
     * Preview image URL. (JPEG / HTTPS)
     * @type {string}
     */
    this.previewImageUrl = previewImageUrl;
  }
}

/**
 * @see https://devdocs.line.me/en/#audio-message
 */
export class AudioMessage extends LineMessage {
  /* eslint-disable no-undef */
  public originalContentUrl: string;
  public duration: number;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]                  Message ID.
   * @param {string} params.type                Identifier for the type of message.
   * @param {string} [params.originalContentUrl]  URL of audio file. (M4A / HTTPS)
   * @param {number} [params.duration]            Length of audio file (milliseconds)
   */
  constructor(
    { id = null, type, originalContentUrl = null, duration = null }: {
      id?: string,
      type: LineMessageType,
      originalContentUrl?: string,
      duration?: number,
    }
  ) {
    super({ id, type });
    /**
     * URL of audio file. (M4A / HTTPS)
     * @type {string}
     */
    this.originalContentUrl = originalContentUrl;
    /**
     * Length of audio file (milliseconds)
     * @type {number}
     */
    this.duration = duration;
  }
}

/**
 * @see https://devdocs.line.me/en/#location-message
 */
export class LocationMessage extends LineMessage {
  /* eslint-disable no-undef */
  public title: string;
  public address: string;
  public latitude: number;
  public longitude: number;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]         Message ID.
   * @param {string} params.type       Identifier for the type of message.
   * @param {string} params.title      Title.
   * @param {string} params.address    Address.
   * @param {number} params.latitude   Latitude.
   * @param {number} params.longitude  Longitude.
   */
  constructor(
    { id = null, type, title, address, latitude, longitude }: {
      id?: string,
      type: LineMessageType,
      title: string,
      address: string,
      latitude: number,
      longitude: number,
    }
  ) {
    super({ id, type });
    /**
    * Title.
    * @type {string}
    */
    this.title = title;
    /**
     * Address.
     * @type {string}
     */
    this.address = address;
    /**
     * Latitude.
     * @type {number}
     */
    this.latitude = latitude;
    /**
     * Longitude.
     * @type {number}
     */
    this.longitude = longitude;
  }
}

/**
 * @see https://devdocs.line.me/en/#sticker-message
 */
export class StickerMessage extends LineMessage {
  /* eslint-disable no-undef */
  public packageId: string;
  public stickerId: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string}  [params.id]         Message ID.
   * @param {string} params.type       Identifier for the type of message.
   * @param {string} params.packageId  Package ID.
   * @param {string} params.stickerId  Sticker ID.
   */
  constructor(
    { id = null, type, packageId, stickerId }: {
      id?: string,
      type: LineMessageType,
      packageId: string,
      stickerId: string,
    }
  ) {
    super({ id, type });
    /**
    * Package ID.
    * @type {string}
    */
    this.packageId = packageId;
    /**
     * Sticker ID.
     * @type {string}
     */
    this.stickerId = stickerId;
  }
}

/**
 * @see https://devdocs.line.me/en/#imagemap-message
 */
export class ImagemapMessage extends LineMessage {
  /* eslint-disable no-undef */
  public baseUrl: string;
  public altText: string;
  public baseSize: Size;
  public actions: ImagemapAction[];
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string} params.type                        Identifier for the type of message.
   * @param {string} params.baseUrl                     Base URL (HTTPS)
   * @param {string} params.altText                     Alternative text
   * @param {Size} params.baseSize                      Base image size.
   * @param {ImagemapAction[] | any[]}  params.actions  Action when tapped
   */
  constructor(
    { type, baseUrl, altText, baseSize, actions }: {
      type: LineMessageType,
      baseUrl: string,
      altText: string,
      baseSize: Size,
      actions: ImagemapAction[] | any[],
    }
  ) {
    super({ id: null, type });
    /**
     * Base URL (HTTPS)
     * @type {string}
     */
    this.baseUrl = baseUrl;
    /**
     * Alternative text
     * @type {string}
     */
    this.altText = altText;
    /**
     * Base image size.
     * @type {Size}
     */
    this.baseSize = baseSize;
    /**
     * Action when tapped
     * @type {ImagemapAction[]}
     */
    this.actions = actions.map(action => ImagemapAction.createFromObject(action));
  }
}

/**
 * @see https://devdocs.line.me/en/#template-messages
 */
export class TemplateMessage extends LineMessage {
  /* eslint-disable no-undef */
  public altText: string;
  public template: TemplateComponent;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string} params.type                 Identifier for the type of message.
   * @param {string} params.altText              Alternative text
   * @param {TemplateComponent | any} params.template  Object with the contents of the template.
   */
  constructor(
    { type, altText, template }: {
      type: LineMessageType,
      altText: string,
      template: TemplateComponent | any,
    }
  ) {
    super({ id: null, type });
    /**
     * Alternative text
     * @type {string}
     */
    this.altText = altText;
    /**
     * Object with the contents of the template.
     * @type {TemplateComponent}
     */
    this.template = TemplateComponent.createFromObject(template);
  }
}
