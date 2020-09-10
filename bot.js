const Wallpapersite = require("./sites/wallpapersite.com");
const Save = require('./save');
const Templator = require('./templator');

const wl = new Wallpapersite();
const save = new Save();
const tp = new Templator();

wl.crawl(json =>{
    let path = './data/wallpapers/';
    let fileName = '';
    json.data.forEach(wallpaper => {
        
        // extract file name from link
        fileName = wallpaper.imageLink;
        fileName = fileName.match(/\/(?:.(?!\/))+$/gi).toString().replace("/", "");

        // downloading original image
        save.save(path+wallpaper.id, fileName, wallpaper.imageLink, wallpaper, (dir, file)=>{

            // resize, crop and templating image
            tp.template(dir, file);

        });
    });
});