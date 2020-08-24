const Crawler = require('./crawler');
const Downloader = require('./downloader');

const cr = new Crawler("https://wallpapersite.com", "https://wallpapersite.com/random-wallpapers");
const dl = new Downloader();
cr.crawl(json =>{
    let counter = 1;
    let fileName = '';
    let baseDir = './data/wallpapers/';
    json.data.forEach(e => {
        cr.grapOriginalLink(e.link, link=>{
            fileName = link.match(/\/(?:.(?!\/))+$/gi).toString().replace("/", "");
            dl.createFolder(baseDir+counter);
            dl.downloadImage(link, baseDir+counter+"/"+fileName);                        
            counter++;
        });
    });
})
