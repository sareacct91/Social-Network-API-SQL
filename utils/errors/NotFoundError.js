module.exports = class NotFoundError extends Error {
  /**
   * @param {string} msg
   */
  constructor(msg) {
    super(msg);
    this.Code = 404;
  }
}