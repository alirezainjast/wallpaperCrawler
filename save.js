const fs = require('fs');
const download = require('download');
const Jsoner = require('./jsoner');

const jsn = new Jsoner();

class Save {

    save(path, fileName, link, json, callback){
        fs.mkdir(path, { recursive: true }, async (err) => {
            if (err) throw err;
            jsn.write(path+"/meta.json", json);
            fs.writeFileSync(path+"/"+fileName, await download(link));
            console.log(fileName + ' downloaded!')
            if(typeof callback == 'function') callback(path, fileName);
        });
    }

}

module.exports = Save;