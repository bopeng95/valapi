const express = require('express');

const { fetchPatches, fetchDetails } = require('../utils/helpers');

const router = express.Router();

const listPatches = async (req, res) => {
  const { lang = 'en-us' } = req.query;
  const data = await fetchPatches(lang, res);
  return res.json(data);
};

const listRecent = async (req, res) => {
  const { lang = 'en-us' } = req.query;
  const { data } = await fetchPatches(lang);
  const recent = await fetchDetails(data[0], res);
  return res.json(recent);
};

router.get('/', listPatches);
router.get('/recent', listRecent);

module.exports = router;
