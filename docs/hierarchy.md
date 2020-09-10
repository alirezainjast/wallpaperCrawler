# Hierarchy

## Direcotories

### /data
contain wallpapers and `meta.json`(which is our local database) will store in this directory.
* data/meta.json => our local database
* data/wallpapers => contain wallpapers```

### /docs
docs created by [docsify](https://docsify.js.org)

### /sites
* each site has it's own crawler
* each file will represeant a json file like this:
``` json
{
    data: [
        {
        link: String,
        tag: Array,
        templated: Boolean,
        id: String,
        imageLink: String
        },
        {
        link: String,
        tag: Array,
        ...
        ]
}
```

### /templates
contain images that we need for templating

## Files

### - /data/meta.json
global data that helps app do things in order(like last id, last wallpaper that was posted and etc...)

### - /data/wallpapers/[ID]/meta.json
contain data about wallpaper

### - /sites/[SITE]
will crawl the site and return an Array of [jsons](https://alirezainjast.github.io/wallpaperCrawler/#/hierarchy?id=sites)

### - app.js
controll center of all operations

### - crawler.js
controll center of crawling operations

### - bot.js
controll center of [telegram bot](https://github.com/yagop/node-telegram-bot-api) operations

### - jsoner.js
read, write and edit ```meta.json``` files

### - save.js
downloading images and writing meta.json(for each wallpaper)

### - templator.js
crop, resize, and template saved images using [jimp](https://www.npmjs.com/package/jimp)