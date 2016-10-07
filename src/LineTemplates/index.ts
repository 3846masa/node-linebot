/* eslint-disable no-unused-vars */
import { TemplateAction } from '../LineActions';
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars, space-infix-ops */
export type LineTemplateType = 'buttons' | 'confirm' | 'carousel';
export namespace LineTemplateType {
  export const BUTTONS: LineTemplateType = 'buttons';
  export const CONFIRM: LineTemplateType = 'confirm';
  export const CAROUSEL: LineTemplateType = 'carousel';
}
/* eslint-enable no-unused-vars, space-infix-ops */

/**
 * @see https://devdocs.line.me/en/#template-messages
 */
export class TemplateComponent {
  /* eslint-disable no-undef */
  public type: LineTemplateType;
  /* eslint-enable no-undef */

  /** @ignore */
  constructor({ type }: { type: LineTemplateType }) {
    /**
     * Identifier for the type of template.
     * @type {string}
     */
    this.type = type;
  }

  /** @ignore */
  static createFromObject(params: any) {
    switch (params.type) {
      case LineTemplateType.BUTTONS: {
        return new TemplateButtons(params);
      }
      case LineTemplateType.CONFIRM: {
        return new TemplateConfirm(params);
      }
      case LineTemplateType.CAROUSEL: {
        return new TemplateCarousel(params);
      }
      default: {
        return new TemplateComponent({ type: params.type });
      }
    }
  }
}

/**
 * @see https://devdocs.line.me/en/#buttons
 */
export class TemplateButtons extends TemplateComponent {
  /* eslint-disable no-undef */
  public thumbnailImageUrl: string;
  public title: string;
  public text: string;
  public actions: TemplateAction[];
  /* eslint-enable no-undef */

  /**
   * @param  {string}  [thumbnailImageUrl]       Image URL (JPEG or PNG / HTTPS / 1:1.51)
   * @param  {string}  [title]                   Title (Max: 40 chars)
   * @param  {string}  text                      Message text (Max: 160 chars (no image, no title) / 60 chars)
   * @param  {TemplateAction[] | any[]} actions  Action when tapped (Max: 4)
   */
  constructor({ thumbnailImageUrl, title, text, actions }: {
    thumbnailImageUrl?: string,
    title?: string,
    text: string,
    actions: TemplateAction[] | any[],
  }) {
    super({ type: LineTemplateType.BUTTONS });
    /**
     * Image URL (JPEG or PNG / HTTPS / 1:1.51)
     * @type {string}
     */
    this.thumbnailImageUrl = thumbnailImageUrl;
    /**
     * Title (Max: 40 chars)
     * @type {string}
     */
    this.title = title;
    /**
     * Message text (Max: 160 chars (no image, no title) / 60 chars)
     * @type {string}
     */
    this.text = text;
    /**
     * Action when tapped (Max: 4)
     * @type {TemplateAction[]}
     */
    this.actions = actions.map(action => TemplateAction.createFromObject(action));
  }
}

/**
 * @see https://devdocs.line.me/en/#confirm
 */
export class TemplateConfirm extends TemplateComponent {
  /* eslint-disable no-undef */
  public text: string;
  public actions: TemplateAction[];
  /* eslint-enable no-undef */

  /**
   * @param  {string}                   text     Message text (Max: 240 chars)
   * @param  {TemplateAction[] | any[]} actions  Action when tapped (Max: 2)
   */
  constructor({ text, actions }: {
    text: string,
    actions: TemplateAction[] | any[],
  }) {
    super({ type: LineTemplateType.CONFIRM });
    /**
     * Message text (Max: 240 chars)
     * @type {string}
     */
    this.text = text;
    /**
     * Action when tapped (Max: 2)
     * @type {TemplateAction[]}
     */
    this.actions = actions.map(action => TemplateAction.createFromObject(action));
  }
}

/**
 * @see https://devdocs.line.me/en/#carousel
 */
export class TemplateCarousel extends TemplateComponent {
  /* eslint-disable no-undef */
  public columns: TemplateColumn[];
  /* eslint-enable no-undef */

  /**
   * @param  {TemplateColumn[] | any[]} columns  Array of columns (Max: 5)
   */
  constructor({ columns }: {
    columns: TemplateColumn[] | any[],
  }) {
    super({ type: LineTemplateType.CAROUSEL });
    /**
     * Array of columns (Max: 5)
     * @type {TemplateColumn[]}
     */
    this.columns = columns.map(column => TemplateColumn.createFromObject(column));
  }
}

/**
 * @see https://devdocs.line.me/en/#column-object
 */
export class TemplateColumn {
  /* eslint-disable no-undef */
  public thumbnailImageUrl: string;
  public title: string;
  public text: string;
  public actions: TemplateAction[];
  /* eslint-enable no-undef */

  /**
   * @param  {string}  [thumbnailImageUrl]       Image URL (JPEG or PNG / HTTPS / 1:1.51)
   * @param  {string}  [title]                   Title (Max: 40 chars)
   * @param  {string}  text                      Message text (Max: 160 chars (no image, no title) / 60 chars)
   * @param  {TemplateAction[] | any[]} actions  Action when tapped (Max: 3)
   */
  constructor({ thumbnailImageUrl, title, text, actions }: {
    thumbnailImageUrl?: string,
    title?: string,
    text: string,
    actions: TemplateAction[] | any[],
  }) {
    /**
     * Image URL (JPEG or PNG / HTTPS / 1:1.51)
     * @type {string}
     */
    this.thumbnailImageUrl = thumbnailImageUrl;
    /**
     * Title (Max: 40 chars)
     * @type {string}
     */
    this.title = title;
    /**
     * Message text (Max: 160 chars (no image, no title) / 60 chars)
     * @type {string}
     */
    this.text = text;
    /**
     * Action when tapped (Max: 3)
     * @type {TemplateAction[]}
     */
    this.actions = actions.map(action => TemplateAction.createFromObject(action));
  }

  /** @ignore */
  static createFromObject(params: any) {
    return new TemplateColumn(params);
  }
}
