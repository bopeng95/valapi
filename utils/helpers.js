const fetch = require('node-fetch');

const { params, paths, domain, windowMs, max } = require('./fixtures');
const { getPatches, getDetails } = require('./scraping');

const rateLimit = `${max} requests per ${windowMs / 60000} minutes`;

const universal = { paths, params, rateLimit };

const handleError = (error, status) => ({
  ...universal,
  status,
  error,
});

const handleSuccess = (data, status) => ({
  data,
  ...universal,
  status,
});

const fetchPatches = (lang, res) => {
  const url = `${domain}/${lang}/news/`;
  return fetch(url)
    .then((response) => response.text())
    .then((body) => {
      const patches = getPatches(body);
      return handleSuccess(patches, res.statusCode);
    })
    .catch((err) =>
      res.status(500).json(handleError(err.message, res.statusCode)),
    );
};

const fetchDetails = (data, res) => {
  const { href, ...rest } = data;
  return fetch(`${domain}${href}`)
    .then((response) => response.text())
    .then((body) => {
      const details = getDetails(body);
      return handleSuccess({ ...details, ...rest }, res.statusCode);
    })
    .catch((err) =>
      res.status(500).json(handleError(err.message, res.statusCode)),
    );
};

module.exports = { fetchPatches, fetchDetails, handleError };
