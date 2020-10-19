const { params } = require('./fixtures');
const { handleError } = require('./helpers');

const redirect = (req, res, next) => {
  const { url } = req;
  if (url === '/') return res.redirect('/patches');
  return next();
};

const checkQueries = (req, res, next) => {
  const { lang = 'en-us' } = req.query;
  if (!params.lang.options[lang])
    return res
      .status(404)
      .json(
        handleError(
          'Invalid parameter. See params for more details',
          res.statusCode,
        ),
      );
  return next();
};

module.exports = { redirect, checkQueries };
