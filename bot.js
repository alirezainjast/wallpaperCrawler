const Crawler = require('./crawler');
const Downloader = require('./downloader');

const cr = new Crawler("https://wallpapersite.com", "https://wallpapersite.com/random-wallpapers");
const dl = new Downloader();
cr.crawl(async json =>{
    let counter = null;
    dl.readLastMeta(lastId =>{
        counter = parseInt(lastId);
    })
    let fileName = '';
    let baseDir = './data/wallpapers/';
    await json.data.forEach(e => {
        cr.grapOriginalLink(e.link, link=>{
            counter++;
            fileName = link.match(/\/(?:.(?!\/))+$/gi).toString().replace("/", "");
            dl.createFolder(baseDir+counter);
            dl.writeImageMeta(baseDir+counter, e)
            dl.downloadImage(link, baseDir+counter+"/"+fileName);
            dl.writeMeta(counter);            
        });
    });
})
