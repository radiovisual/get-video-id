# get-video-id 

> Get the Youtube, Vimeo, or Vine video id from a url or embed string.

[![Build Status](https://travis-ci.org/radiovisual/get-video-id.svg?branch=master)](https://travis-ci.org/radiovisual/get-video-id) [![Coverage Status](https://coveralls.io/repos/github/radiovisual/get-video-id/badge.svg?branch=master)](https://coveralls.io/github/radiovisual/get-video-id?branch=master)

This module will extract the Youtube, Vimeo, or Vine Video ID from any known Youtube, Vimeo or Vine url patterns, including embed strings.

*If you discover a Youtube, Vimeo, or Vine url pattern that is not covered by this module, please [open an issue](https://github.com/radiovisual/get-video-id/issues)
to report it, or [submit a Pull Request](https://github.com/radiovisual/get-video-id/pull/new/master). Thanks!*

**Pull Requests are welcome** if you would like to see support for other video services.

## Install

```
$ npm install --save get-video-id
```


## Usage

Simply supply the module with any known Youtube, Vimeo or Vine url (or embed string) and the ID will be extracted:

```js
const getVideoId = require('get-video-id');

getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
//=> '8rSH8-pbHZ0'
```


## API

### getVideoId(input)

Get the Video ID string.  

#### input

Type: `string`

The youtube, vimeo, or vine url (or embed code) from which you want to find the video id. See the
[Patterns section](https://github.com/radiovisual/get-video-id#patterns) to see the formats that can be supplied.

## Patterns

This module will extract the video id from the url / embed patterns below.  
(where `*` is the id and `?` or `&` are parameter strings):

**Youtube Shortcodes**
```
http://youtu.be/*?
https://youtu.be/*
http://youtu.be/*
youtube://
```

**Youtube `/v/` or `/vi/`**
```
http://www.youtube.com/v/*
http://youtube.com/vi/*?
http://youtube.com/v/*?
```

**Youtube `v=` or `vi=`**
```
http://www.youtube.com/ytscreeningroom?v=*
http://www.youtube.com/watch?v=*?&
https://www.youtube.com/watch?v=*
http://youtube.com/watch?vi=*&
http://youtube.com/?vi=*&
http://youtube.com/?v=*
```

**Youtube embed**
```
http://www.youtube.com/embed/*?
https://www.youtube.com/embed/*
```

**Youtube user**
```
http://www.youtube.com/user/username#p/a/u/2/*
http://www.youtube.com/user/username#p/u/1/*?
http://www.youtube.com/user/username#p/u/1/*
```

**Youtube iframe**
```
<iframe width="560" height="315" src="https://www.youtube.com/embed/*" frameborder="0" allowfullscreen></iframe>
```

**Youtube `-nocookie`**
```
www.youtube-nocookie.com/embed/*?
```

**Vimeo urls**
```
https://vimeo.com/*
https://player.vimeo.com/video/*
```

**Vimeo iframe**
```
<iframe src="https://player.vimeo.com/video/*" ...
```

**Vine urls**
```
https://vine.co/v/*
```

**Vine iframe**
```
<iframe src="https://vine.co/v/*/embed/simple" width="600" height="600" frameborder="0"></iframe>
<iframe src="https://vine.co/v/*/embed/postcard" width="600" height="600" frameborder="0"></iframe>
```

## License

MIT © [Michael Wuergler](http://numetriclabs.com)
