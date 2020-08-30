const fs = require('fs');
const download = require('download');
const { count } = require('console');

class Downloader {
    constructor(){
        this.lastId = '';
    }

    idPlusPlus(){
        this.lastId++;
    }

    readLastMeta(callback){
        if (fs.existsSync('./data/meta.json')){
            fs.readFile('./data/meta.json', (err, file)=>{
                if(err) throw err;
                let tmpLastId = '';
                tmpLastId = file;
                tmpLastId = JSON.parse(tmpLastId);
                this.lastId = parseInt(tmpLastId.lastId);
                callback(this.lastId);
            })
        } 
        else{
            callback(0);
        }
    }

    writeMeta(counter){
        let json = JSON.stringify({ "lastId": counter });
        fs.writeFileSync('./data/meta.json', json);
    }

    createFolder(path){
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
        return this;
    }

    writeImageMeta(path, json){
        json = JSON.stringify(json);
        fs.writeFileSync(path+"/meta.json", json)
    }

    async downloadImage(url, fileName, callback){
        console.log("download..." + fileName)
        fs.writeFileSync(fileName, await download(url));
        callback;
    }
}

module.exports = Downloader;