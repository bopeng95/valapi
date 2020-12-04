const cheerio = require('cheerio');

const { patchOnly } = require('./fixtures');

const removeDub = (list) => {
  const set = new Set();
  let i = 0;
  while (i < list.length) {
    if (set.has(list[i]) || !list[i]) list.splice(i, 1);
    else {
      set.add(list[i]);
      i += 1;
    }
  }
};

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
      const description = $(link).find('.NewsCard-module--title--1MoLu').text();
      const result = {
        href,
        date,
        description,
        patch: href.substring(46, href.length - 1),
      };
      return result;
    })
    .get();
  return list;
};

const getDetails = (body) => {
  const $ = cheerio.load(body);
  const parent = $('.NewsArticleContent-module--articleSectionWrapper--3SR6V');
  const content = parent.children();

  // highlight image
  const highlightImg = $(content[0]).find('img');
  const hasHL = highlightImg.attr('alt')
    ? highlightImg.attr('alt').includes('Highlights')
    : null;
  const src = highlightImg.attr('src');
  const highlight = hasHL ? src : 'No highlight image';

  const extractList = (main, elem) => {
    const items = $(elem).children();
    items.each((i, el) => {
      const tag = el.tagName;
      if (tag === 'ul') extractList(main, el);
      else {
        const list = $(el).find('ul');
        const strong = $(el).find('strong').text();
        if (list.html() && !!strong) {
          main.push(strong);
          extractList(main, list);
        } else {
          const text = $(el)
            .text()
            .replace(/[\n\t]/g, '');
          if (text) main.push(text);
        }
      }
    });
  };

  const extractTable = (main, elem) => {
    const list = $(elem).find('ul');
    extractList(main, list);
  };

  const extractData = (node) => {
    let key = 'Entry';
    const data = {};
    $(node)
      .children()
      .each((i, el) => {
        const list = [];
        const tag = el.tagName;
        let text = $(el).text();

        if (tag.startsWith('h')) key = text;
        if (tag === 'div') {
          key = 'Video';
          text = $(el).find('iframe').attr('src');
        }
        if (tag === 'a') text = $(el).attr('href');
        if (tag === 'img') text = $(el).attr('src');
        if (tag === 'ul') extractList(list, el);
        if (tag === 'table') {
          extractTable(list, el);
          removeDub(list);
        }
        if (tag === 'p') list.push(text);

        if (!data[key]) data[key] = {};

        const value = list.length ? list : text;
        if (!tag.startsWith('h') && tag !== 'br') {
          if ((tag === 'p' || tag === 'ul') && data[key][tag]) {
            if (tag === 'p') data[key][tag] = data[key][tag].concat(value);
          } else data[key][tag] = value;
        }
      });
    return data;
  };

  const arr = content
    .map((i, el) => {
      const data = extractData(el);
      return data;
    })
    .get();

  const notes = arr.reduce((result, item) => ({ ...result, ...item }), {});

  return { highlight, notes };
};

module.exports = { getPatches, getDetails };
