/* eslint-disable no-unused-vars, space-infix-ops */
export type LineSourceType = 'user' | 'group' | 'room';
export namespace LineSourceType {
  export const USER: LineSourceType = 'user';
  export const GROUP: LineSourceType = 'group';
  export const ROOM: LineSourceType = 'room';
}
/* eslint-enable no-unused-vars, space-infix-ops */

/**
 * Line Source
 * @see https://devdocs.line.me/en/#common-fields
 */
export class LineSource {
  /* eslint-disable no-undef */
  public type: LineSourceType;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string} params.type  Identifier for the type of source.
   */
  constructor({ type }: { type: LineSourceType }) {
    /**
     * Identifier for the type of source.
     * @type {string}
     */
    this.type = type;
  }

  /** @private */
  static createFromObject(params: any) {
    switch (params.type) {
      case LineSourceType.USER: {
        return new UserSource(params);
      }
      case LineSourceType.GROUP: {
        return new GroupSource(params);
      }
      case LineSourceType.ROOM: {
        return new RoomSource(params);
      }
      default: {
        return new LineSource({ type: params.type });
      }
    }
  }
}

/**
 * @see https://devdocs.line.me/en/#source-user
 */
export class UserSource extends LineSource {
  /* eslint-disable no-undef */
  public userId: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string} params.type    Identifier for the type of source.
   * @param {string} params.userId  ID of the source user.
   */
  constructor({ type, userId }: { type: LineSourceType, userId: string }) {
    super({ type });
    /**
     * ID of the source user.
     * @type {string}
     */
    this.userId = userId;
  }
}

/**
 * @see https://devdocs.line.me/en/#source-group
 */
export class GroupSource extends LineSource {
  /* eslint-disable no-undef */
  public groupId: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string} params.type     Identifier for the type of source.
   * @param {string} params.groupId  ID of the source group.
   */
  constructor({ type, groupId }: { type: LineSourceType, groupId: string }) {
    super({ type });
    /**
     * ID of the source group.
     * @type {string}
     */
    this.groupId = groupId;
  }
}

/**
 * @see https://devdocs.line.me/en/#source-room
 */
export class RoomSource extends LineSource {
  /* eslint-disable no-undef */
  public roomId: string;
  /* eslint-enable no-undef */

  /**
   * Constructor
   * @param {Object} params
   * @param {string} params.type    Identifier for the type of source.
   * @param {string} params.roomId  ID of the source room.
   */
  constructor({ type, roomId }: { type: LineSourceType, roomId: string }) {
    super({ type });
    /**
     * ID of the source room.
     * @type {string}
     */
    this.roomId = roomId;
  }
}
