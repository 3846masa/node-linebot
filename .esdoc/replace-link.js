const cheerio = require('cheerio');
let option;

/**
 * take option
 * @param {Object} ev - handle event.
 */
exports.onStart = function(ev) {
  option = ev.data.option;
  for (let item of option.replaces) {
    item.from = new RegExp(item.from);
  }
}

exports.onHandleHTML = function(ev) {
  // modify HTML
  const $ = cheerio.load(ev.data.html);
  $('a[href]').each(function () {
    let href = $(this).attr('href');
    for (let item of option.replaces) {
      href = href.replace(item.from, item.to);
    }
    $(this).attr('href', href);
  });
  ev.data.html = $.html();
};
