const Wallpapersite = require("./sites/wallpapersite.com");
const Save = require('./save');
const Cropper = require('./cropper');

const wl = new Wallpapersite();
const save = new Save();
const cr = new Cropper();

// downloading and saving images
wl.crawl(json =>{
    let path = './data/wallpapers/';
    let fileName = '';
    json.data.forEach(wallpaper => {        
        fileName = wallpaper.imageLink.match(/\/(?:.(?!\/))+$/gi).toString().replace("/", "");
        console.log('start downloading... ' + wallpaper.id);
        save.save(path+wallpaper.id, fileName, wallpaper.imageLink, wallpaper, (dir, file)=>{
            cr.crop(dir, file);
            console.log(file+ " saved!")
        });
    });
});