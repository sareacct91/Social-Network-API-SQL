module.exports = class BadRequestError extends Error {
  /**
   * @param {string} msg
   */
  constructor(msg) {
    super(msg);
    this.Code = 400;
  }
}