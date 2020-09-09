const fs = require('fs');
const download = require('download');

class Save {

    save(path, fileName, link, json, callback){
        fs.mkdir(path, { recursive: true }, async (err) => {
            if (err) throw err;
            json = JSON.stringify(json);
            fs.writeFileSync(path+"/meta.json", json);
            fs.writeFileSync(path+"/"+fileName, await download(link));
            console.log(fileName + ' downloaded!')
            if(typeof callback == 'function') callback(path, fileName);
        });
    }

}

module.exports = Save;