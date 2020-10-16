const cheerio = require('cheerio');

const { queries, patchOnly } = require('./fixtures');

const handleError = (error) => ({ queries, status: 404, error });
const handleSuccess = (data) => ({
  data,
  queries,
  status: 200,
  error: '',
});

const getPatches = (body) => {
  const $ = cheerio.load(body);
  const news = $('.NewsArchive-module--newsCard--3GNFp');
  const recent = news.filter((i, el) => {
    const link = $(el).find('a');
    // const description = $(link).find('.NewsCard-module--title--1MoLu').text();
    return link.attr('href').substring(6).startsWith(patchOnly);
  });
  const list = $(recent)
    .map((i, el) => {
      const link = $(el).find('a');
      const href = $(link).attr('href');
      const date = $(link)
        .find('.copy-02 .NewsCard-module--published--37jmR')
        .text();
      const patch = $(link).find('.NewsCard-module--title--1MoLu').text();
      const result = { href, date, patch };
      return result;
    })
    .get();
  return list;
};

module.exports = { getPatches, handleError, handleSuccess };
