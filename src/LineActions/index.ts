/* eslint-disable no-unused-vars, space-infix-ops */
export type LineActionType = 'uri' | 'message' | 'postback';
export namespace LineActionType {
  export const URI: LineActionType = 'uri';
  export const MESSAGE: LineActionType = 'message';
  export const POSTBACK: LineActionType = 'postback';
}
/* eslint-enable no-unused-vars, space-infix-ops */

/* eslint-disable no-undef */
export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
}
/* eslint-enable no-undef */

/**
 * @typedef   {Object} Rectangle
 * @property  {number} x
 * @property  {number} y
 * @property  {number} width
 * @property  {number} height
 * @see https://devdocs.line.me/en/#imagemap-area-object
 */

/**
 * Imagemap Action
 * @see https://devdocs.line.me/en/#imagemap-action-object
 */
export class ImagemapAction {
  /* eslint-disable no-undef */
  public type: string;
  public area: Rectangle;
  /* eslint-enable no-undef */

  /**
   * @param  {string}    type  Identifier for the type of action.
   * @param  {Rectangle} area  Defined tappable area.
   */
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

  /** @private */
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
   * @param  {string}    type     Identifier for the type of action.
   * @param  {Rectangle} area     Defined tappable area.
   * @param  {string}    linkUri  Webpage URL
   */
  constructor({ type, area, linkUri }: { type: string, area: Rectangle, linkUri: string }) {
    super({ type, area });
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
   * @param  {string}    type  Identifier for the type of action.
   * @param  {Rectangle} area  Defined tappable area.
   * @param  {string}    text  Message to send.
   */
  constructor({ type, area, text }: { type: string, area: Rectangle, text: string }) {
    super({ type, area });
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

  /**
   * @param  {string} type  Identifier for the type of action.
   * @param  {string} label Label for the action. (Max: 20 chars)
   */
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

  /** @private */
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
   * @param  {string} type   Identifier for the type of action.
   * @param  {string} label  Label for the action. (Max: 20 chars)
   * @param  {string} uri    URI opened when the action is performed
   */
  constructor({ type, label, uri }: { type: string, label: string, uri: string }) {
    super({ type, label });
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
   * @param  {string} type   Identifier for the type of action.
   * @param  {string} label  Label for the action. (Max: 20 chars)
   * @param  {string} text   Text sent when the action is performed. (Max: 300 chars)
   */
  constructor({ type, label, text }: { type: string, label: string, text: string }) {
    super({ type, label });
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
export class TemplatePostbackAction extends TemplateMessageAction {
  /* eslint-disable no-undef */
  public data: string;
  /* eslint-enable no-undef */

  /**
   * @param  {string}  type   Identifier for the type of action.
   * @param  {string}  label  Label for the action. (Max: 20 chars)
   * @param  {string}  [text]   Text sent when the action is performed. (Max: 300 chars)
   * @param  {string}  data   String returned via webhook in the postback.data property of the postback event. (Max: 300 chars)
   */
  constructor({ type, label, text = null, data }: {
    type: string,
    label: string,
    text?: string,
    data: string,
  }) {
    super({ type, label, text });
    /**
     * String returned via webhook in the postback.data property of the postback event. (Max: 300 chars)
     * @type {string}
     */
    this.data = data;
  }
}
