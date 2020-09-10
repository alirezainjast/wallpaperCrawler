const fs = require('fs');
const download = require('download');
const Jsoner = require('./jsoner');

const jsn = new Jsoner();

class Save {

    save(path, fileName, link, json, callback){
        fs.mkdir(path, { recursive: true }, async (err) => {
            if (err) throw err;
            console.log('working on=> ' + json.id)
            jsn.write(path+"/meta.json", json);
            fs.writeFileSync(path+"/"+fileName, await download(link));
            if(typeof callback == 'function') callback(path, fileName);
        });
    }

}

module.exports = Save;