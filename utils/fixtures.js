const domain = 'https://playvalorant.com';
const patchOnly = '/news/game-updates/valorant';

const queries = {
  lang: {
    default: 'en-us',
    options: {
      'en-us': 'English (United States)',
    },
  },
};

module.exports = { queries, domain, patchOnly };
