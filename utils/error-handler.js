
/**
 *
 * @param {*} err any error objects
 * @param {import('express')} req express request obejct
 * @param {import('express').Response} res express response object
 * @param {Function} next call the next middleware
 */
function errorHandler(err, req, res, next) {
  console.log('\nerror handler\n', err, '\n');

  res.status(500).json({ err });
}

module.exports = errorHandler;