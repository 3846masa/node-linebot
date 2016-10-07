/* eslint-disable no-unused-vars */
import { Rectangle } from '../interfaces';
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars, space-infix-ops */
export type LineActionType = 'uri' | 'message' | 'postback';
export namespace LineActionType {
  export const URI: LineActionType = 'uri';
  export const MESSAGE: LineActionType = 'message';
  export const POSTBACK: LineActionType = 'postback';
}
/* eslint-enable no-unused-vars, space-infix-ops */

/**
 * Imagemap Action
 * @see https://devdocs.line.me/en/#imagemap-action-object
 */
export class ImagemapAction {
  /* eslint-disable no-undef */
  public type: string;
  public area: Rectangle;
  /* eslint-enable no-undef */

  /** @ignore */
  constructor({ type, area }: { type: string, area: Rectangle }) {
    /**
     * Identifier for the type of action.
     * @type {string}
     */
    this.type = type;
    /**
     * Defined tappable area.
     * @type {Rectangle}
     */
    this.area = area;
  }

  /** @ignore */
  static createFromObject(params: any) {
    switch (params.type) {
      case LineActionType.URI: {
        return new ImagemapURIAction(params);
      }
      case LineActionType.MESSAGE: {
        return new ImagemapMessageAction(params);
      }
      default: {
        return new ImagemapAction({ type: params.type, area: params.area });
      }
    }
  }
}

/**
 * URI action
 * @see https://devdocs.line.me/en/#imagemap-action-object
 */
export class ImagemapURIAction extends ImagemapAction {
  /* eslint-disable no-undef */
  public linkUri: string;
  /* eslint-enable no-undef */

  /**
   * @param  {Object} params
   * @param  {string} params.type     Identifier for the type of action.
   * @param  {Rectangle} params.area  Defined tappable area.
   * @param  {string} params.linkUri  Webpage URL
   */
  constructor({
    area,
    linkUri,
  }: {
    area: Rectangle,
    linkUri: string,
  }) {
    super({ type: LineActionType.URI, area });
    /**
     * Webpage URL.
     * @type {string}
     */
    this.linkUri = linkUri;
  }
}

/**
 * Message action
 * @see https://devdocs.line.me/en/#imagemap-action-object
 */
export class ImagemapMessageAction extends ImagemapAction {
  /* eslint-disable no-undef */
  public text: string;
  /* eslint-enable no-undef */

  /**
   * @param  {Object} params
   * @param  {Rectangle} params.area  Defined tappable area.
   * @param  {string} params.text     Message to send.
   */
  constructor({
    area,
    text,
  }: {
    area: Rectangle,
    text: string,
  }) {
    super({ type: LineActionType.MESSAGE, area });
    /**
     * Message to send.
     * @type {string}
     */
    this.text = text;
  }
}

/**
 * Template Action
 * @see https://devdocs.line.me/en/#template-action
 */
export class TemplateAction {
  /* eslint-disable no-undef */
  public type: string;
  public label: string;
  /* eslint-enable no-undef */

  /** @ignore */
  constructor({ type, label }: { type: string, label: string }) {
    /**
     * Identifier for the type of action.
     * @type {string}
     */
    this.type = type;
    /**
     * Label for the action. (Max: 20 chars)
     * @type {string}
     */
    this.label = label;
  }

  /** @ignore */
  static createFromObject(params: any) {
    switch (params.type) {
      case LineActionType.URI: {
        return new TemplateURIAction(params);
      }
      case LineActionType.MESSAGE: {
        return new TemplateMessageAction(params);
      }
      case LineActionType.POSTBACK: {
        return new TemplatePostbackAction(params);
      }
      default: {
        return new TemplateAction({ type: params.type, label: params.label });
      }
    }
  }
}

/**
 * URI action
 * @see https://devdocs.line.me/en/#template-action
 */
export class TemplateURIAction extends TemplateAction {
  /* eslint-disable no-undef */
  public uri: string;
  /* eslint-enable no-undef */

  /**
   * @param  {Object} params
   * @param  {string} params.label  Label for the action. (Max: 20 chars)
   * @param  {string} params.uri    URI opened when the action is performed
   */
  constructor({ label, uri }: { label: string, uri: string }) {
    super({ type: LineActionType.URI, label });
    /**
     * URI opened when the action is performed
     * @type {string}
     */
    this.uri = uri;
  }
}

/**
 * Message action
 * @see https://devdocs.line.me/en/#template-action
 */
export class TemplateMessageAction extends TemplateAction {
  /* eslint-disable no-undef */
  public text: string;
  /* eslint-enable no-undef */

  /**
   * @param  {Object} params
   * @param  {string} params.label  Label for the action. (Max: 20 chars)
   * @param  {string} params.text   Text sent when the action is performed. (Max: 300 chars)
   */
  constructor({ label, text }: { label: string, text: string }) {
    super({ type: LineActionType.MESSAGE, label });
    /**
     * Text sent when the action is performed. (Max: 300 chars)
     * @type {string}
     */
    this.text = text;
  }
}

/**
 * Postback action
 * @see https://devdocs.line.me/en/#template-action
 */
export class TemplatePostbackAction extends TemplateAction {
  /* eslint-disable no-undef */
  public text: string;
  public data: string;
  /* eslint-enable no-undef */

  /**
   * @param  {Object} params
   * @param  {string} params.label   Label for the action. (Max: 20 chars)
   * @param  {string} [params.text]  Text sent when the action is performed. (Max: 300 chars)
   * @param  {string} params.data    String returned via webhook in the postback.data property of the postback event. (Max: 300 chars)
   */
  constructor({ label, text = undefined, data }: {
    label: string,
    text?: string,
    data: string,
  }) {
    super({ type: LineActionType.POSTBACK, label });
    /**
     * Text sent when the action is performed. (Max: 300 chars)
     * @type {string}
     */
    this.text = text;
    /**
     * String returned via webhook in the postback.data property of the postback event. (Max: 300 chars)
     * @type {string}
     */
    this.data = data;
  }
}
