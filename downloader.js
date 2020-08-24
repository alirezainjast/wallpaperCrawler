const fs = require('fs');
const download = require('download');

class Downloader {
    constructor(){
        this.lastId = '';
    }

    idPlusPlus(){
        this.lastId++;
    }

    readLastData(callback){
        fs.readFile('./data/meta.json', (err, file)=>{
            if(err) throw err;
            let tmpLastId = '';
            tmpLastId = file;
            tmpLastId = JSON.parse(tmpLastId);
            this.lastId = parseInt(tmpLastId.lastId);
            callback(this.lastId);
        })
    }

    createFolder(path){
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
        return this;
    }

    writeData(json){

    }

    downloadImage(url, fileName, callback){
        fs.writeFileSync(fileName, download(url));
    }
}

module.exports = Downloader;