const axios = require('axios');
const cheerio = require('cheerio');

class Crawler {
    constructor(baseUrl=String, url=String){
        this.baseUrl = baseUrl;
        this.url = url;
        this.json = {data: []}
    }

    createJson(links, tags, length){
        length = parseInt(length);
        for(let i = 0; i < length; i++){
            this.json.data.push(
                {link: links[i],tag: tags[i]}
            )
        }
    }

    crawl(callback){
        let tmpLinks = []
        let tmpTags = []
        axios.get(this.url)
    .then(res =>{
        let body = res.data;
        const $ = cheerio.load(body);
        $('#pics-list p a').each((i, e) =>{
            tmpLinks.push(this.baseUrl+e.attribs.href);
        })
        $('#pics-list p a span').each((i, e) =>{
            tmpTags.push(e.children[0].data.replace(/\s/g, '').split(','));
        })
        this.createJson(tmpLinks, tmpTags, tmpLinks.length);
        if(typeof callback == 'function') callback(this.json);
    })
    .catch(err =>{
        console.log(err)
    })
    return this.json;
    }

    grapOriginalLink(url, callback){
        let originalLink = '';
        axios.get(url)
            .then(res =>{
                let body = res.data;
                const $ = cheerio.load(body);
                $('.res-ttl .original').each((i, e) =>{
                    originalLink = this.baseUrl+e.attribs.href;
                })
                callback(originalLink);
            })
        return this;
    }

}

module.exports = Crawler;