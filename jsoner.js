const fs = require('fs');
const { ok } = require('assert');

class Jsoner{
    read = (path, callback) =>{
        if (fs.existsSync(path)){
            fs.readFile(path, (err, file)=>{
                if(err) throw err;
                let json = JSON.parse(file);
                if(typeof callback == 'function') callback(json);
            })
        } 
        else{
            console.log("ther is no " + path);
        }
    }

    write = (path, json) =>{
        json = JSON.stringify(json);
        fs.writeFileSync(path, json);
    }

    edit = (path, key, value) =>{
        if (fs.existsSync(path)){
            fs.readFile(path, (err, file)=>{
                if(err) throw err;
                let json = JSON.parse(file);
                json[key] = value;
                json = JSON.stringify(json);
                fs.writeFileSync(path, json);
            })
        } 
        else{
            console.log("ther is no " + path);
        }
    }
}

module.exports = Jsoner;