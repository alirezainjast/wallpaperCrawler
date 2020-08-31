const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

class Wallpapersite {
    constructor(){
        this.baseUrl = 'https://wallpapersite.com/random-wallpapers';
        this.actualUrl = 'https://wallpapersite.com/';
        this.json = { data: [] };
        this.initalId = null;
        this.metaPath = './data/meta.json';
    }

    readInitialId(callback){
        const metaPath = this.metaPath;
        if (fs.existsSync(metaPath)){
            fs.readFile(metaPath, (err, file)=>{
                if(err) throw err;
                this.initalId = parseInt(JSON.parse(file).lastId);
                if(typeof callback == 'function') callback(this.initalId);
            })
        } 
        else{
            this.initalId = null;
            console.log("ther is no " + metaPath);
        }
    }

    crawl(callback){

        console.log("start crawling " + this.baseUrl + "...")
        axios.get(this.baseUrl)
            .then(res =>{
                let tmpLinks = []
                let tmpTags = []
                let tmpImageLinks = []
                let tmpId = 0;
                let body = res.data;
                const $ = cheerio.load(body);
                
                $('#pics-list p a').each((i, e) =>{
                    tmpLinks.push(this.baseUrl+e.attribs.href);
                })
                $('#pics-list p a span').each((i, e) =>{
                    tmpTags.push(e.children[0].data.replace(/\s/g, '').split(','));
                })
                
                console.log('grabin original images link...')
                tmpLinks.forEach(e => {
                    axios.get(e)
                    .then(res =>{
                        const body = res.data;
                        const $ = cheerio.load(body);
                        $('.res-ttl .original').each((i, e) =>{
                            tmpImageLinks.push(this.actualUrl+e.attribs.href);
                        })
                    })
                    .catch(err =>{
                        console.error(err);
                    })
                });

                const timer = setInterval(()=>{
                    if(tmpImageLinks.length == 12){
                        console.log('reading last global id(initalId)...');
                        this.readInitialId(id =>{
                            console.log('setting json data...')
                            tmpId = id;
        
                            for(let i = 0; i < tmpLinks.length; i++){
                                tmpId++;
                                this.json.data.push(
                                    {
                                        link: tmpLinks[i],
                                        tag: tmpTags[i],
                                        templated: false,
                                        id: tmpId,
                                        imageLink: tmpImageLinks[i],
                                    }
                                );   
                            }             
        
                            console.log('writing last global id(initalId)...');
                            this.initalId = JSON.stringify({ "lastId": tmpId });
                            fs.writeFileSync(this.metaPath, this.initalId);
                            console.log('crawling finished!');
                            if(typeof callback == 'function') callback(this.json);
                            clearInterval(timer);
                        })
                    }
                }, 3000)
            })

            .catch(err =>{
                console.log(err);
            })
    }
}

module.exports = Wallpapersite;