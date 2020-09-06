const jimp = require('jimp');
const fs = require('fs');

class Cropper {
    constructor(){
        this.dir = __dirname + '/data/wallpapers';
    }

    crop = (dir, file) =>{
        console.log(dir, file);
        jimp.read(dir+'/'+file)
        .then(image => {
            return image
            .cover(1440,2560)
            .write(dir+'/'+'(mobile)@internetwallpaper-'+file);
        })
        .catch(err =>{
            console.error(err);
        });
    jimp.read(dir+'/'+file)
        .then(image => {
            return image
            .cover(2560,1440)
            .write(dir+'/'+'(pc)@internetwallpaper-'+file);
        })
        .catch(err =>{
            console.error(err);
        });
    }

    isImage = (file) => {
        let len = file.length;
        let type = file[len-3]+file[len-2]+file[len-1];
        if(type == 'jpg' || type == 'png') return true;
        return false;
    }

    template(){
        fs.readdir(this.dir, (err, dirs) =>{
            if(err) throw err;

            dirs.forEach(d => {
                d = this.dir+"/"+d;
                if(fs.lstatSync(d).isDirectory()){
                    fs.readdir(d, (err, files) =>{                        
                        files.forEach(f => {
                            if(this.isImage(d+'/'+f)){
                                this.crop(d,f)
                            }
                        });
                    })
                }
            });
        })
    }

}

module.exports = Cropper;