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

### - /sites/[SITE]
will crawl the site and return an Array of [jsons](http://localhost:3000/#/hierarchy?id=sites)

### - bot.js
this is the controll center of operations(most modules will init from this file)

### - save.js
will savie images to `data/wallpapers/[ID_OF_WALLPAPER]` and changing content of local database(`data/meta.json`)

### - templator.js
will crop, resize, and template saved images using [jimp](https://www.npmjs.com/package/jimp)

### - jsoner
read, write and edit ```meta.json``` files