const domain = 'https://playvalorant.com';
const patchOnly = '/news/game-updates/valorant';

const windowMs = 15 * 60 * 1000;
const max = 100;

const params = {
  lang: {
    default: 'en-us',
    options: {
      'en-us': 'English (United States)',
      'ko-kr': 'Korean (Korea)',
      'ja-jp': 'Japanese (Japan)',
    },
  },
};

const paths = {
  '/patches': 'list of available patches',
  '/patches/recent': 'displays the most recent patch details',
};

module.exports = { params, paths, domain, patchOnly, windowMs, max };
