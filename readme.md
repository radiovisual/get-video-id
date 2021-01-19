# get-video-id [![Build Status](https://travis-ci.org/radiovisual/get-video-id.svg?branch=master)](https://travis-ci.org/radiovisual/get-video-id) [![Coverage Status](https://coveralls.io/repos/github/radiovisual/get-video-id/badge.svg?branch=master)](https://coveralls.io/github/radiovisual/get-video-id?branch=master)

> Get the YouTube, Vimeo, Vine or VideoPress video id from a url or embed string.

This module will extract the YouTube, Vimeo, Vine, or VideoPress Video ID from any known YouTube, Vimeo, Vine, or VideoPress url patterns, including embed strings.

**Pull Requests are welcome** if you would like to see support for other video services or if you find an unsupported video url pattern.

## Install

```
$ npm install --save get-video-id
```


## Import

You can use this module in **Node.js** or in the **browser**. See below for the different importing options.

**CommonJS**
```js
const getVideoId = require('get-video-id');
```

**ES2015 Module**
```js
import getVideoId from 'get-video-id';
```

**Browser**
```html
<script src="get-video-id.umd.min.js"s><script>
```

## Usage

Simply supply the module with any known YouTube, Vimeo or Vine url (or embed string) and its metadata (`id` and `service`) will be returned:

```js
import getVideoId from 'get-video-id';

getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
//=> { id: '8rSH8-pbHZ0', service: 'youtube' }

const { id } = getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
//=> '8rSH8-pbHZ0'
```

You can also use Google redirection URL (link from the search list) with YouTube, Vimeo or Vine as target url.

```js
getVideoId('https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeG1uDU0rSLw&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA');
//=> { id: 'eG1uDU0rSLw', service: 'youtube' }
```

## API

### getVideoId(input)

Returns a metadata `Object` with the video `id` and `service` name:

```
{
  id: 'String',
  service: 'String'
}
```

#### input

Type: `String`

The YouTube, Vimeo, or Vine url (or embed code) from which you want to find the video id. See the
[Patterns section](https://github.com/radiovisual/get-video-id#patterns) to see the formats that can be supplied.

## Patterns

This module works on the url / embed patterns below.
(where `*` is the id and `?` or `&` are parameter strings):

### YouTube 

**YouTube Shortcodes**
```
http://youtu.be/*?
https://youtu.be/*
http://youtu.be/*
http://y2u.be/*
youtube://
```

**YouTube `/v/` or `/vi/`**
```
http://www.youtube.com/v/*
http://youtube.com/vi/*?
http://youtube.com/v/*?
```

**YouTube `v=` or `vi=`**
```
http://www.youtube.com/ytscreeningroom?v=*
http://www.youtube.com/watch?v=*?&
https://www.youtube.com/watch?v=*
http://youtube.com/watch?vi=*&
http://youtube.com/?vi=*&
http://youtube.com/?v=*
```

**YouTube image links `/vi/*/` or `/an_webp/*/`**
```
https://i.ytimg.com/vi/*/hqdefault.jpg
https://i.ytimg.com/an_webp/MYDcdp-VNmQ/mqdefault_6s.webp
```

**YouTube embed**
```
http://www.youtube.com/embed/*?
https://www.youtube.com/embed/*
```

**YouTube user**
```
http://www.youtube.com/user/username#p/a/u/2/*
http://www.youtube.com/user/username#p/u/1/*?
http://www.youtube.com/user/username#p/u/1/*
```

**YouTube iframe**
```
<iframe width="560" height="315" src="https://www.youtube.com/embed/*" frameborder="0" allowfullscreen></iframe>
```

**YouTube `-nocookie`**
```
www.youtube-nocookie.com/embed/*?
```

**YouTube Attribution Link**
```
http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3D*%26
http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3D
http://www.youtube.com/attribution_link?u=/watch?v=*&
http://www.youtube.com/attribution_link?u=/watch?v=*
http://www.youtube.com/attribution_link?/watch?v=*
```

**Google Redirection to YouTube**

```
https://google.cz/url?source=web&url=<YOUTUBE_URL>
https://google.com/image?url=<YOUTUBE_URL>
```

### Vimeo 

**Vimeo urls**
```
https://vimeo.com/*
https://vimeo.com/*?
https://player.vimeo.com/video/*
https://player.vimeo.com/video/*?
https://www.vimeo.com/*
https://www.vimeo.com/*?
```

**Vimeo swf embed**
```
http://vimeo.com/foo.swf?clip_id=1234
```

**Vimeo iframe**
```
<iframe src="https://player.vimeo.com/video/*" ...
```

### Vine

**Vine urls**
```
https://vine.co/v/*
```

**Vine iframe**
```
<iframe src="https://vine.co/v/*/embed/simple" width="600" height="600" frameborder="0"></iframe>
<iframe src="https://vine.co/v/*/embed/postcard" width="600" height="600" frameborder="0"></iframe>
```

### VideoPress

**VideoPress urls**
```
https://videopress.com/v/*
https://videopress.com/embed/*
```

**VideoPress iframes**
```
<iframe src="https://videopress.com/embed/zcnJVzQF" width="600" height="600"></iframe>
```

## Contributing

If you discover a url pattern that is not covered by this module, please [open an issue](https://github.com/radiovisual/get-video-id/issues) to report it, or [submit a Pull Request](https://github.com/radiovisual/get-video-id/pull/new/master). For any submitted pull requests, please ensure that you include unit test(s) to fully cover your code contribution(s).

## License

MIT © [Michael Wuergler](https://github.com/radiovisual)
