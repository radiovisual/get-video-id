# get-video-id 

> Get the youtube or vimeo video id from a url or embed string.

[![Build Status](https://travis-ci.org/radiovisual/get-video-id.svg?branch=master)](https://travis-ci.org/radiovisual/get-video-id) [![Coverage Status](https://coveralls.io/repos/github/radiovisual/get-video-id/badge.svg?branch=master)](https://coveralls.io/github/radiovisual/get-video-id?branch=master)

## Install

```
$ npm install --save get-video-id
```


## Usage

```js
const getVideoId = require('get-video-id');

getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
//=> '8rSH8-pbHZ0'

```


## API

### getVideoId(input)

#### input

Type: `string`

The youtube or vimeo url or embed code from which you want to find the video id.

## Patterns

This module will extract the video id from the following url / embed patterns:

**Youtube**

<pre>
// shorcodes
    http://youtu.be/*?
    https://youtu.be/*
    http://youtu.be/*
    youtube://
  
// /v/ or /vi/
    http://www.youtube.com/v/*
    http://youtube.com/vi/*?
    http://youtube.com/v/*?
 
// v= or vi=
    http://www.youtube.com/ytscreeningroom?v=*
    http://www.youtube.com/watch?v=*?&
    https://www.youtube.com/watch?v=*
    http://youtube.com/watch?vi=*&
    http://youtube.com/?vi=*&
    http://youtube.com/?v=*

// embed
    http://www.youtube.com/embed/*?
    www.youtube-nocookie.com/embed/*?
    https://www.youtube.com/embed/*

// user
    http://www.youtube.com/user/username#p/a/u/2/*
    http://www.youtube.com/user/username#p/u/1/*?
    http://www.youtube.com/user/username#p/u/1/*

// iframe embed
    <iframe width="560" height="315" src="https://www.youtube.com/embed/*" frameborder="0" allowfullscreen></iframe>
</pre>

Note: any youtube url that has `-no-cookie` in it is also supported.

**Vimeo**

<pre>
// urls
    https://vimeo.com/*
    https://player.vimeo.com/video/*

// iframe embed
    <iframe src="https://player.vimeo.com/video/*" ...
</pre>

## License

MIT © [Michael Wuergler](http://numetriclabs.com)
