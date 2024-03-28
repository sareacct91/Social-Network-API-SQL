
/**
 *
 * @param {*} err any error objects
 * @param {import('express')} req express request obejct
 * @param {import('express').Response} res express response object
 * @param {Function} next call the next middleware
 */
function errorHandler(err, req, res, next) {
  console.log('\nerror handler\n', err, '\n');

  const customError = {
    code: err.code || 500,
    message: err.message || 'Something went wrong. Try again later'
  }

  res.status(customError.code).json({err: customError.message});
}

module.exports = errorHandler;