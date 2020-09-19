const Crawler = require('./crawler');
const Bot = require('./bot');

const cr = new Crawler();
const bt = new Bot();

let min = 1000*60;

bt.send(); 
cr.initCrawler();

const timer = setInterval(() => {
    bt.send(); 
}, min*10);

const timer2 = setInterval(() => {
    cr.initCrawler();
}, min*30);