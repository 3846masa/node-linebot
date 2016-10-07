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
export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
}
export interface Size {
  width: number,
  height: number,
}
/* eslint-enable no-undef */

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
 * @typedef   {Object} Rectangle
 * @property  {number} x
 * @property  {number} y
 * @property  {number} width
 * @property  {number} height
 * @see https://devdocs.line.me/en/#imagemap-area-object
 */
/**
 * @typedef   {Object} Size
 * @property  {number} width
 * @property  {number} height
 */
