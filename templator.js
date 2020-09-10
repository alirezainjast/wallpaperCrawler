// (read https://www.npmjs.com/package/jimp for info about image operations)
const jimp = require('jimp');
const Jsoner = require('./jsoner');

const jsn = new Jsoner();

class Templator {
    constructor(){
        this.dir = __dirname + '/data/wallpapers';
    }

    // actually this method(template) will crop images and then call
    // teplate2 wich will create template image...
    template = (dir, file, callback) =>{
        jimp.read(dir+'/'+file)
            .then(image => {
                image
                .cover(1440,2560)
                .write(dir+'/'+'(mobile)@internetwallpaper-'+file);
            })
            .catch(err =>{
                console.error(err);
            });
        jimp.read(dir+'/'+file)
            .then(image => {
                image
                .cover(2560,1440)
                .write(dir+'/'+'(pc)@internetwallpaper-'+file);
                this.template2(
                    dir+'/'+'(mobile)@internetwallpaper-'+file,
                    dir+'/'+'(pc)@internetwallpaper-'+file,
                    dir,
                    file,
                )
            })
            .catch(err =>{
                console.error(err);
            });
    }

    template2 = (mobileImg, pcImg, dir, file) =>{
        jimp.read('./templates/bg.jpg')
            .then(bg =>{
                jimp.read(mobileImg, (err, m) =>{
                    if(err) throw err;
                    m
                    .resize(376, 733)
                    jimp.read(pcImg, (err, p) =>{
                        if(err) throw err;
                        p
                        .resize(702, 396)
                        jimp.read('./templates/overlay.png', (err, overlay) =>{
                            if(err) throw err;
                            bg
                            .blit(m, 1024, 437)
                            .blit(p, 163, 467)
                            .blit(overlay, 0, 0)
                            .write(dir+'/'+'(template)@internetwallpaper-'+file);
                            jsn.edit(dir+'/meta.json', 'templated', true);
                            console.log(dir + ' templated successfully!');
                        })
                    })
                })
            })
        .catch(err => {
            console.error(err);
        })
    }

}

module.exports = Templator;