/* eslint-disable no-unused-vars */
import { ImagemapAction } from '../LineActions';
import { TemplateComponent } from '../LineTemplates';
import { Size } from '../interfaces';
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

/**
 * Line Message
 * @see https://devdocs.line.me/en/#send-message-object
 */
export class LineMessage {
  /* eslint-disable no-undef */
  public id: string;
  public type: LineMessageType;
  /* eslint-enable no-undef */

  /** @private */
  constructor({
    id = undefined,
    type,
  }: {
    id?: string,
    type: LineMessageType
  }) {
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
        return TextMessage.createFromObject(params);
      }
      case LineMessageType.IMAGE: {
        return ImageMessage.createFromObject(params);
      }
      case LineMessageType.VIDEO: {
        return VideoMessage.createFromObject(params);
      }
      case LineMessageType.AUDIO: {
        return AudioMessage.createFromObject(params);
      }
      case LineMessageType.LOCATION: {
        return LocationMessage.createFromObject(params);
      }
      case LineMessageType.STICKER: {
        return StickerMessage.createFromObject(params);
      }
      case LineMessageType.IMAGEMAP: {
        return ImagemapMessage.createFromObject(params);
      }
      case LineMessageType.TEMPLATE: {
        return TemplateMessage.createFromObject(params);
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
   * @param {string} params.text  Message text.
   */
  constructor({ text }: { text: string }) {
    super({ type: LineMessageType.TEXT });
    /**
    * Message text.
    * @type {string}
    */
    this.text = text;
  }

  /** @private */
  static createFromObject(params: any) {
    const instance = new TextMessage(params);
    instance.id = params.id;
    return instance;
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
   * @param {string} params.originalContentUrl  Image URL. (JPEG / HTTPS)
   * @param {string} params.previewImageUrl     Preview image URL. (JPEG / HTTPS)
   */
  constructor(
    {
      originalContentUrl,
      previewImageUrl,
    }: {
      originalContentUrl: string,
      previewImageUrl: string,
    }
  ) {
    super({ type: LineMessageType.IMAGE });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new ImageMessage(params);
    instance.id = params.id;
    return instance;
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
   * @param {string} params.originalContentUrl  URL of video file. (MP4 / HTTPS)
   * @param {string} params.previewImageUrl     Preview image URL. (JPEG / HTTPS)
   */
  constructor(
    {
      originalContentUrl,
      previewImageUrl,
    }: {
      originalContentUrl: string,
      previewImageUrl: string,
    }
  ) {
    super({ type: LineMessageType.VIDEO });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new VideoMessage(params);
    instance.id = params.id;
    return instance;
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
   * @param {string} params.originalContentUrl  URL of audio file. (M4A / HTTPS)
   * @param {number} params.duration            Length of audio file (milliseconds)
   */
  constructor(
    {
      originalContentUrl,
      duration,
    }: {
      originalContentUrl: string,
      duration: number,
    }
  ) {
    super({ type: LineMessageType.AUDIO });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new AudioMessage(params);
    instance.id = params.id;
    return instance;
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
   * @param {string} params.title              Title.
   * @param {string} params.address            Address.
   * @param {number} params.latitude           Latitude.
   * @param {number} params.longitude          Longitude.
   */
  constructor(
    {
      title,
      address,
      latitude,
      longitude,
    }: {
      title: string,
      address: string,
      latitude: number,
      longitude: number,
    }
  ) {
    super({ type: LineMessageType.LOCATION });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new LocationMessage(params);
    instance.id = params.id;
    return instance;
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
   * @param {string} params.packageId         Package ID.
   * @param {string} params.stickerId         Sticker ID.
   */
  constructor(
    {
      packageId,
      stickerId,
    }: {
      packageId: string,
      stickerId: string,
    }
  ) {
    super({ type: LineMessageType.STICKER });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new StickerMessage(params);
    instance.id = params.id;
    return instance;
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
   * @param {string} params.baseUrl                     Base URL (HTTPS)
   * @param {string} params.altText                     Alternative text
   * @param {Size} params.baseSize                      Base image size.
   * @param {ImagemapAction[] | Object[]}  params.actions  Action when tapped
   */
  constructor(
    {
      baseUrl,
      altText,
      baseSize,
      actions,
    }: {
      type?: LineMessageType,
      baseUrl: string,
      altText: string,
      baseSize: Size,
      actions: ImagemapAction[] | any[],
    }
  ) {
    super({ type: LineMessageType.IMAGEMAP });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new ImagemapMessage(params);
    return instance;
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
   * @param {string} params.altText                    Alternative text
   * @param {TemplateComponent | Object} params.template  Object with the contents of the template.
   */
  constructor(
    {
      altText,
      template,
    }: {
      altText: string,
      template: TemplateComponent | any,
    }
  ) {
    super({ type: LineMessageType.TEMPLATE });
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

  /** @private */
  static createFromObject(params: any) {
    const instance = new TemplateMessage(params);
    return instance;
  }
}
