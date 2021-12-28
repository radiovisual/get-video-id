# get-video-id [![codecov](https://codecov.io/gh/radiovisual/get-video-id/branch/master/graph/badge.svg?token=fG7V2VRDYY)](https://codecov.io/gh/radiovisual/get-video-id)

> Get the YouTube, Vimeo, Vine, VideoPress, TikTok, Microsoft Stream and Dailymotion video id from a url or embed string.

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
<script src="https://cdn.jsdelivr.net/npm/get-video-id/dist/get-video-id.min.js"></script>
```

###### Download

- [Normal](https://cdn.jsdelivr.net/npm/get-video-id/dist/get-video-id.js)
- [Minified](https://cdn.jsdelivr.net/npm/get-video-id/dist/get-video-id.min.js)

###### CDN

- [jsdelivr](https://www.jsdelivr.com/package/npm/get-video-id)
- [unpkg](https://unpkg.com/get-video-id)


## Usage

Simply supply the module with a url or embed string matching any of the [patterns known by this module](https://github.com/radiovisual/get-video-id#patterns) and its metadata of `id` and `service` will be returned:

```js
import getVideoId from 'get-video-id';

getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
//=> { id: '8rSH8-pbHZ0', service: 'youtube' }

const { id } = getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');
//=> '8rSH8-pbHZ0'
```

get-video-id can also find the video buried in a Google redirection URL if it contains a reference to any of the supported URL patterns.

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

The url (or embed code) from which you want to find the video id. See the
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

*YouTube Shorts**
```
https://youtube.com/shorts/*
https://www.youtube.com/shorts/*
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

**YouTube `/e/`**
```
https://www.youtube.com/e/*
https://www.youtube.com/e/*?
http://www.youtube.com/e/*
http://www.youtube.com/e/*?
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

**Vimeo events**
```
https://vimeo.com/event/*
```

**Vimeo iframe**
```
<iframe src="https://player.vimeo.com/video/*" ...
```

**Vimeo unlisted/private urls**
```
https://vimeo.com/*/privateHash
```
⚠️ **Please note**: That `get-video-id` _will_ extract the id from the private/unlisted URLs formats for Vimeo, but the private hash would still be required to rebuild the URL in order to make it reachable/sharable in a browser. If you use `get-video-id` to help you rebuild URLs, you will want to look for this pattern yourself and remember to include the privateHash in the url you want to share. `get-video-id` focuses on extracing video ids, and ignores any other special paramaters or formats at the moment.

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

### Microsoft Stream

**Microsoft Stream urls**
```
https://web.microsoftstream.com/video/*
https://web.microsoftstream.com/embed/video/*
```

**Microsoft Stream iframes**
```
<iframe src="https://web.microsoftstream.com/embed/video/*?&" width="640" height="360"></iframe>
```
### TikTok

**TikTok urls**
```
https://www.tiktok.com/*/video/*
https://www.tiktok.com/*/video/*?
````
**:warning: Unsupported TikTok urls**
 *  Shortlink URL (requires a fetch/redirect to find the real id) : `https://vm.tiktok.com/shorLinkId/`

### Dailymotion

**Dailymotion urls**
```
http://www.dailymotion.com/video/*_text
http://www.dailymotion.com/video/*
http://www.dailymotion.com/fr/relevance/search/search+query/1#video=*
https://www.dailymotion.com/video/*?playlist=
http://dai.ly/*
```

**Dailymotion iframes**
```
<iframe src="https://www.dailymotion.com/embed/video/*" width="600" height="600"></iframe>
```

**:warning: Unsupported Dailymotion urls**
 *  Channel id urls: `http://www.dailymotion.com/hub/*_title`

## Contributing

If you discover a url pattern that is not covered by this module, please [open an issue](https://github.com/radiovisual/get-video-id/issues) to report it, or [submit a Pull Request](https://github.com/radiovisual/get-video-id/pull/new/master). For any submitted pull requests, please ensure that you include unit test(s) to fully cover your code contribution(s).

## License

MIT © [Michael Wuergler](https://github.com/radiovisual)
