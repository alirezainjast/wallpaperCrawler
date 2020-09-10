const TelegramBot = require('node-telegram-bot-api');
const Jsoner = require('./jsoner');
const fs = require('fs');

require('dotenv').config()

const jsn = new Jsoner();

class Bot {
    constructor(){
        this.initalId = null;
        this.metaPath = './data/meta.json';
        this.wallpapersPath = './data/wallpapers';        
    }

    readInitialId(callback){
        jsn.read(this.metaPath, (json) =>{
            this.initalId = parseInt(json.lastUpload)            
            if(typeof callback == 'function') callback(this.initalId);
        })
    }

    isTemplated(path, callback){
        jsn.read(path, (json) =>{
            if(json.templated){
                if(typeof callback == 'function') callback(json.templated);
            } 
        })
    }

    send(){
        this.readInitialId((id) =>{            
            id++;
            jsn.edit(this.metaPath, "lastUpload", id);


            const token = process.env.BOT_TOKEN;
            const channelId = process.env.CHANNEL_ID;
            const bot = new TelegramBot(token, {polling: true});
            const path = this.wallpapersPath+'/'+id;

            this.isTemplated(path+'/'+'meta.json', (templated) =>{
                if(templated){                       

                        let caption = "\n@internetWallpapers";                        
                        jsn.read(path+'/'+'meta.json', (json) =>{
                            json.tags.forEach(tag =>{                             
                                caption =  '#'+tag + " " + caption;
                            })

                            fs.readdir(path, (err, files) =>{
                                if(err) throw err;

                                let mobile = '';
                                let pc = '';
                                let template = ''; 
                                
                                files.forEach(file => {
                                    if(file.match(/\(mobile\)\@internetWallpapers/g)){
                                        mobile = path+'/'+file;
                                    } else
                                    if(file.match(/\(pc\)\@internetWallpapers/g)){
                                        pc = path+'/'+file;
                                    } else
                                    if(file.match(/\(template\)\@internetWallpapers/g)){
                                        template = path+'/'+file;
                                    }
                                });


                                bot.sendPhoto(channelId, template, {"caption": caption});
                                bot.sendDocument(channelId, pc)
                                bot.sendDocument(channelId, mobile)
                                    .then(mssg =>{
                                        console.log('wallpaper published sucessfully :)')
                                    })

                        })
                        
                    });
                }
                else{
                    console.err('the wallpaper was not templated!')
                }
            })
        })        
    }

}

module.exports = Bot;
