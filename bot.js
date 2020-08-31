const Wallpapersite = require("./sites/wallpapersite.com");
const Save = require('./save');

const wl = new Wallpapersite();
const save = new Save();

wl.crawl(json =>{
    let path = './data/wallpapers/';
    let fileName = '';
    json.data.forEach(wallpaper => {        
        fileName = wallpaper.imageLink.match(/\/(?:.(?!\/))+$/gi).toString().replace("/", "");
        console.log('saving new wallpaper(' + wallpaper.id + ')')
        save.save(path+wallpaper.id, fileName, wallpaper.imageLink, wallpaper);
    });
});