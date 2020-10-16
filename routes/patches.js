const express = require('express');
const fetch = require('node-fetch');

const { domain } = require('../utils/fixtures');
const { getPatches, handleSuccess } = require('../utils/helpers');

const router = express.Router();

const listPatches = (req, res) => {
  const { lang = 'en-us' } = req.query;
  return fetch(`${domain}/${lang}/news/`)
    .then((response) => response.text())
    .then((body) => {
      const patches = getPatches(body);
      const data = handleSuccess(patches);
      return res.json(data);
    });
};

router.get('/', listPatches);

module.exports = router;
