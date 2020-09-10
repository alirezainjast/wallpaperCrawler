const Crawler = require('./crawler');
const Bot = require('./bot');

const cr = new Crawler();
const bt = new Bot();

cr.initCrawler();
// bt.send();