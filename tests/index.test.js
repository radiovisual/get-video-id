/* eslint max-len: 0 */
import test from 'ava';
import fn from '../dist/get-video-id.js';

test('expects a string', t => {
	t.throws(() => {
		fn({});
	}, 'get-video-id expects a string');
});

test('returns null as id and service', t => {
	const notFound = fn('foo');
	t.is(notFound.id, null);
	t.is(notFound.service, null);
});

/**
 *  Vimeo should be able to find these patterns:
 *
 *  // urls
 *  https://vimeo.com/id
 *  https://player.vimeo.com/video/id
 *  https://vimeo.com/id?
 *  https://www.vimeo.com/id?
 *  https://www.vimeo.com/id
 *  https://vimeo.com/id/hash
 *
 *  // iframe
 *  iframe src="https://player.vimeo.com/video/id"
 *
 *  // events
 *  https://vimeo.com/event/id
 *
 *  // channels groups and albums
 *  https://vimeo.com/channels/id
 *  https://vimeo.com/channels/yourchannel/id
 *  https://vimeo.com/groups/name/videos/id
 *  https://vimeo.com/album/album_id/video/id
 *  http://vimeo.com/name.swf?clip_id=id
 */

test('gets vimeo metadata from url', t => {
	t.is(fn('https://player.vimeo.com/video/123450987').id, '123450987');
	t.is(fn('https://vimeo.com/1230897').id, '1230897');
	t.is(fn('https://vimeo.com/140542479#t=0m3s').id, '140542479');
	t.is(fn('https://player.vimeo.com/video/176337266?color=ffffff&title=0&byline=0&portrait=0&badge=0').id, '176337266');

	t.is(fn('https://player.vimeo.com/video/123450987#t=0m3s').service, 'vimeo');
	t.is(fn('https://vimeo.com/123450987/randomhash').service, 'vimeo');
	t.is(fn('https://vimeo.com/123450987/randomhash').id, '123450987');
});

test('gets vimeo metadata from iframe', t => {
	const string_ = '<iframe src="https://player.vimeo.com/video/97682350" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/97682350">Todo list application utilizing the Swift programming language</a> from <a href="https://vimeo.com/user27750098">Rex Fatahi</a> on <a href="https://vimeo.com">Vimeo</a>.</p>';
	t.is(fn(string_).id, '97682350');
	t.is(fn(string_).service, 'vimeo');
});

test('handles [uncommon] leading \'www\' in vimeo urls', t => {
	t.is(fn('https://www.vimeo.com/187191771').id, '187191771');
	t.is(fn('https://www.vimeo.com/187191771').service, 'vimeo');
	t.is(fn('<iframe src="https://www.player.vimeo.com/video/97682350" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').id, '97682350');
	t.is(fn('https://www.player.vimeo.com/video/123450987').id, '123450987');
	t.is(fn('https://www.vimeo.com/1230897').id, '1230897');
	t.is(fn('https://www.vimeo.com/140542479#t=0m3s').id, '140542479');
	t.is(fn('https://www.player.vimeo.com/video/176337266?color=ffffff&title=0&byline=0&portrait=0&badge=0').id, '176337266');
	t.is(fn('https://www.player.vimeo.com/video/123450987#t=0m3s').service, 'vimeo');
	t.is(fn('https://www.vimeo.com/123450987/randomhash').id, '123450987');
});

test('handles vimeo channel, groups, albums url patterns', t => {
	t.is(fn('https://vimeo.com/channels/1234').id, '1234');
	t.is(fn('https://vimeo.com/channels/yourchannel/12345').id, '12345');
	t.is(fn('https://vimeo.com/groups/name/videos/123456').id, '123456');
	t.is(fn('https://vimeo.com/album/album_id/video/1234567').id, '1234567');
});

test('handles swf embed patterns', t => {
	t.is(fn('http://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').id, '1234');
	t.is(fn('https://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').id, '1234');
	t.is(fn('http://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').service, 'vimeo');
	t.is(fn('https://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').service, 'vimeo');
	t.is(fn('http://vimeo.com/name.swf?clip_id=1234').id, '1234');
	t.is(fn('https://vimeo.com/name.swf?clip_id=1234').id, '1234');
	t.is(fn('http://vimeo.com/name.swf?clip_id=1234').service, 'vimeo');
	t.is(fn('https://vimeo.com/name.swf?clip_id=1234').service, 'vimeo');
});

test('handles vimeo events patterns', t => {
	t.is(fn('https://vimeo.com/event/12345').id, '12345');
	t.is(fn('https://vimeo.com/event/12345').service, 'vimeo');
});

test('vimeo links returns undefined id if id missing', t => {
	const object = fn('https://www.vimeo.co');
	t.is(object.id, undefined);
	t.is(object.service, 'vimeo');
});

/**
 *  VideoPress should be able to find these patterns:
 *
 *  // urls
 *  https://videopress.com/v/id
 *  https://videopress.com/embed/id
 *
 *  // iframe
 *  <iframe src="https://videopress.com/embed/zcnJVzQF"
 *
 */

test('gets videopress metadata from url', t => {
	t.is(fn('https://videopress.com/v/dyrgndFq').id, 'dyrgndFq');
	t.is(fn('https://videopress.com/v/dyrgndFq#fullscreen').id, 'dyrgndFq');
	t.is(fn('https://videopress.com/embed/zcnJVzQz?hd=0&autoPlay=0&permalink=0&loop=0').id, 'zcnJVzQz');

	t.is(fn('https://videopress.com/embed/zcnJVzQz?hd=0&autoPlay=0&permalink=0&loop=0').service, 'videopress');
});

test('gets videopress metadata from iframe', t => {
	const string_ = '<iframe width="400" height="300" src="https://videopress.com/embed/zcnJVzQz?hd=0&amp;autoPlay=0&amp;permalink=0&amp;loop=0" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>';
	t.is(fn(string_).id, 'zcnJVzQz');
	t.is(fn(string_).service, 'videopress');
});

test('videopress links returns undefined id if id missing', t => {
	const object = fn('https://videopress.com');
	t.is(object.id, undefined);
	t.is(object.service, 'videopress');
});

/**
 *  Vine should be able to find these patterns:
 *
 *  // urls
 *  https://vine.co/v/id
 *
 *  // iframe
 *  <iframe src="https://vine.co/v/id/embed/simple"
 *  <iframe src="https://vine.co/v/id/embed/postcard"
 *
 */

test('gets vine metadata from url', t => {
	t.is(fn('https://vine.co/v/e5vIvmV5v9J').id, 'e5vIvmV5v9J');
	t.is(fn('https://vine.co/v/e5vIvmV5v9J/').id, 'e5vIvmV5v9J');
	t.is(fn('https://vine.co/v/e5vIvmV5v9J/embed').id, 'e5vIvmV5v9J');
	t.is(fn('https://vine.co/v/e5vIvmV5v9J/card?api=1/').id, 'e5vIvmV5v9J');
	t.is(fn('https://vine.co/v/bjpPT1xwg6B/embed/simple').id, 'bjpPT1xwg6B');
	t.is(fn('https://vine.co/v/bjpPT1xwg6B/embed/postcard?audio=1').id, 'bjpPT1xwg6B');

	t.is(fn('https://vine.co/v/e5vIvmV5v9J/').service, 'vine');
	t.is(fn('https://vine.co/v/bjpPT1xwg6B/embed/postcard?audio=1').service, 'vine');
});

test('gets vine metadata from iframe', t => {
	const string_ = '<iframe src="https://vine.co/v/bjpPT1xwg6B/embed/simple" width="600" height="600" frameborder="0"></iframe>';

	t.is(fn(string_).id, 'bjpPT1xwg6B');
	t.is(fn(string_).service, 'vine');
});

test('gets vine metadata from postcard iframe', t => {
	const string_ = '<iframe src="https://vine.co/v/bjpPT1xwg6B/embed/postcard" width="600" height="600" frameborder="0"></iframe>';

	t.is(fn(string_).id, 'bjpPT1xwg6B');
	t.is(fn(string_).service, 'vine');
});

test('vine links returns undefined id if id missing', t => {
	const object = fn('https://vine.co');
	t.is(object.id, undefined || null);
	t.is(object.service, 'vine');
});

/**
 * Youtube should be able to find these patterns:
 *
 *  // shortcodes
 *  http://youtu.be/id?
 *  https://youtu.be/id
 *  http://youtu.be/id
 *  http://y2u.be/id
 *  youtube://
 *
 *  // /v/ or /vi/
 *  http://www.youtube.com/v/id
 *  http://youtube.com/vi/id?
 *  http://youtube.com/v/id?
 *
 *  // v= or vi=
 *  http://www.youtube.com/ytscreeningroom?v=id
 *  http://www.youtube.com/watch?v=id?&
 *  https://www.youtube.com/watch?v=id
 *  http://youtube.com/watch?vi=id&
 *  http://youtube.com/?vi=id&
 *  http://youtube.com/?v=id
 *
 *  // embed
 *  http://www.youtube.com/embed/id?
 *  www.youtube-nocookie.com/embed/id?
 *  https://www.youtube.com/embed/id
 *
 *  // user
 *  http://www.youtube.com/user/username#p/a/u/2/id
 *  http://www.youtube.com/user/username#p/u/1/id?
 *  http://www.youtube.com/user/username#p/u/1/id
 *
 *  // iframe embed
 *  <iframe width="560" height="315" src="https://www.youtube.com/embed/id" frameborder="0" allowfullscreen></iframe>
 *
 *  // attribution_link
 *  http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3D*%26
 *  https://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3D*%26
 *
 */

test('gets youtube metadata from iframe', t => {
	const string_ = '<iframe width="560" height="315" src="https://www.youtube.com/embed/97682350" frameborder="0" allowfullscreen></iframe>';

	t.is(fn(string_).id, '97682350');
	t.is(fn(string_).service, 'youtube');
});

test('gets metadata from youtube shortcode formats', t => {
	t.is(fn('youtube://ABC12301').id, 'ABC12301');
	t.is(fn('https://youtu.be/ABC12302').id, 'ABC12302');
	t.is(fn('http://youtu.be/ABC12303').id, 'ABC12303');
	t.is(fn('http://youtu.be/ABC12304?feature=youtube_gdata_player').id, 'ABC12304');
	t.is(fn('http://y2u.be/ABC12304').id, 'ABC12304');

	t.is(fn('http://youtu.be/ABC12304?feature=youtube_gdata_player').service, 'youtube');
});

test('handles youtube v= and vi= formats', t => {
	t.is(fn('http://www.youtube.com/ytscreeningroom?v=ABC1230').id, 'ABC1230');
	t.is(fn('https://www.youtube.com/watch?v=ABC12301').id, 'ABC12301');
	t.is(fn('http://www.youtube.com/watch?v=ABC12302&list=abc123&index=2&feature=plpp_video').id, 'ABC12302');
	t.is(fn('http://www.youtube.com/watch?v=ABC12303&feature=channel').id, 'ABC12303');
	t.is(fn('http://www.youtube.com/watch?v=ABC12304&playnext_from=TL&videos=abc123&feature=sub').id, 'ABC12304');
	t.is(fn('http://www.youtube.com/watch?v=ABC12305&feature=channel').id, 'ABC12305');
	t.is(fn('http://www.youtube.com/watch?v=ABC12306&playnext_from=TL&videos=abc123&feature=sub').id, 'ABC12306');
	t.is(fn('http://www.youtube.com/watch?v=ABC12307').id, 'ABC12307');
	t.is(fn('http://youtube.com/?v=ABC12308&feature=youtube_gdata_player').id, 'ABC12308');
	t.is(fn('http://youtube.com/?vi=ABC12309&feature=youtube_gdata_player').id, 'ABC12309');
	t.is(fn('http://youtube.com/watch?v=ABC12310&feature=youtube_gdata_player').id, 'ABC12310');
	t.is(fn('http://youtube.com/watch?vi=ABC12311&feature=youtube_gdata_player').id, 'ABC12311');
	t.is(fn('http://www.youtube.com/watch?v=ABC12312&feature=youtube_gdata_player').id, 'ABC12312');
	t.is(fn('http://www.youtube.com/watch?v=ABC12313&feature=youtu.be').id, 'ABC12313');

	t.is(fn('http://www.youtube.com/watch?v=ABC12306&playnext_from=TL&videos=abc123&feature=sub').service, 'youtube');
});

test('handles youtube /v/ and /vi/ formats', t => {
	t.is(fn('http://www.youtube.com/v/ABC1230').id, 'ABC1230');
	t.is(fn('http://youtube.com/v/ABC12301?feature=youtube_gdata_player').id, 'ABC12301');
	t.is(fn('http://youtube.com/vi/ABC12302?feature=youtube_gdata_player').id, 'ABC12302');
	t.is(fn('https://i.ytimg.com/vi/0okagl9U2eo/hqdefault.jpg').id, '0okagl9U2eo');
	t.is(fn('http://youtube.com/vi/ABC12302?feature=youtube_gdata_player').service, 'youtube');
});

test('handles youtube image /an_webp/{id}/ formats', t => {
	t.is(fn('https://i.ytimg.com/an_webp/MYDcdp-VNmQ/mqdefault_6s.webp').id, 'MYDcdp-VNmQ');
});

test('handles youtube /embed/ formats', t => {
	t.is(fn('https://www.youtube.com/embed/ABC1230').id, 'ABC1230');
	t.is(fn('www.youtube-nocookie.com/embed/ABC12301?rel=0').id, 'ABC12301');
	t.is(fn('http://www.youtube.com/embed/ABC12302?rel=0').id, 'ABC12302');

	t.is(fn('http://www.youtube.com/embed/ABC12302?rel=0').service, 'youtube');
});

test('handles youtube /user/ formats', t => {
	t.is(fn('http://www.youtube.com/user/username#p/u/1/ABC1230').id, 'ABC1230');
	t.is(fn('http://www.youtube.com/user/username#p/a/u/2/ABC12301').id, 'ABC12301');
	t.is(fn('http://www.youtube.com/user/username#p/u/1/ABC12302?rel=0').id, 'ABC12302');

	t.is(fn('http://www.youtube.com/user/username#p/u/1/ABC12302?rel=0').service, 'youtube');
	t.is(fn('https://youtube.com/user/WMFinland#p/a/u/1/G-3YxlZIhus').id, 'G-3YxlZIhus');
});

test('ignores youtube.com/user/* patterns', t => {
	t.is(fn('https://www.youtube.com/user/ThreeDaysGraceVideos').id, undefined);
});

test('returns id:undefined with /user/ format that does not have a video id', t => {
	t.is(fn('https://www.youtube.com/user/ThreeDaysGraceVideos/videos').id, undefined);
});

test('removes -nocookie', t => {
	t.is(fn('http://www.youtube-nocookie.com/ytscreeningroom?v=ABC12300').id, 'ABC12300');
	t.is(fn('http://www.youtube-nocookie.com/v/ABC12301').id, 'ABC12301');
	t.is(fn('http://www.youtube-nocookie.com/user/username#p/u/1/ABC12302').id, 'ABC12302');
	t.is(fn('https://www.youtube-nocookie.com/embed/ABC12303').id, 'ABC12303');

	t.is(fn('http://www.youtube-nocookie.com/user/username#p/u/1/ABC12302').service, 'youtube');
});

test('handles youtube attribution_links', t => {
	t.is(fn('http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3DABC12300%26feature%3Dshare&a=JdfC0C9V6ZI').id, 'ABC12300');
	t.is(fn('https://www.youtube.com/attribution_link?a=JdfC0C9V6ZI&u=%2Fwatch%3Fv%3DABC12301%26feature%3Dshare').id, 'ABC12301');
	t.is(fn('http://www.youtube.com/attribution_link?u=/watch?v=ABC12302&feature=share&list=UUsnCjinFcybOuyJU1NFOJmg&a=LjnCygXKl21WkJdyKu9O-w').id, 'ABC12302');
	t.is(fn('http://www.youtube.com/attribution_link?u=/watch?v=ABC12303&feature=share&a=9QlmP1yvjcllp0h3l0NwuA').id, 'ABC12303');
	t.is(fn('http://www.youtube.com/attribution_link?a=fF1CWYwxCQ4&u=/watch?v=ABC12304&feature=em-uploademail').id, 'ABC12304');
	t.is(fn('http://www.youtube.com/attribution_link?a=fF1CWYwxCQ4&feature=em-uploademail&u=/watch?v=ABC12305').id, 'ABC12305');
	t.is(fn('http://www.youtube.com/attribution_link?u=/watch?v=ABC12302&feature=share&list=UUsnCjinFcybOuyJU1NFOJmg&a=LjnCygXKl21WkJdyKu9O-w').service, 'youtube');
});

test('youtube links returns undefined id if id missing', t => {
	const object = fn('https://www.youtube.com');
	t.is(object.id, undefined);
	t.is(object.service, 'youtube');
});

test('removes time hash at end of string ', t => {
	t.is(fn('https://www.youtube.com/watch?v=G-3YxlZIhus#t=0m10s').id, 'G-3YxlZIhus');
	t.is(fn('http://www.youtube.com/watch?v=G-3YxlZIhus#t=0m10s').id, 'G-3YxlZIhus');
	t.is(fn('http://www.youtube.com/watch?v=G-3YxlZIhus#t=0m10s').service, 'youtube');
});

test('removes trailing parameters from youtube urls', t => {
	t.is(fn('http://youtu.be/G-3YxlZIhus&feature=channel').id, 'G-3YxlZIhus');
	t.is(fn('http://youtube.com/vi/G-3YxlZIhus&feature=channel').id, 'G-3YxlZIhus');
	t.is(fn('http://youtube.com/vi/G-3YxlZIhus&feature=channel').service, 'youtube');
	t.is(fn('http://youtube.com/vi/G-3YxlZIhus&feature=share').id, 'G-3YxlZIhus');
	t.is(fn('http://youtube.com/vi/G-3YxlZIhus&foo=bar').id, 'G-3YxlZIhus');
});

/**
 * Google redirect patterns:
 *
 *  https://google.cz/url?source=web&url=id
 *  https://google.com/image?url=id
 *
 */

test('handles google redirection to youtube', t => {
	const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeG1uDU0rSLw&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA';
	t.is(fn(url).id, 'eG1uDU0rSLw');
	t.is(fn(url).service, 'youtube');
});

test('handles google redirection to vimeo', t => {
	const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&url=https%3A%2F%2Fvimeo.com%2F35652044&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw';
	t.is(fn(url).id, '35652044');
	t.is(fn(url).service, 'vimeo');
});

test('google link returns null as id and service if missing url parameter', t => {
	const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw';
	t.is(fn(url).id, null);
	t.is(fn(url).service, null);
});

/**
 *  Microsoft Stream should be able to find these patterns:
 *
 *  // urls
 *  https://web.microsoftstream.com/video/id
 *
 *  // iframe
 *  <iframe src="https://web.microsoftstream.com/embed/video/id"
 *
 */

test('gets microsoft stream from url', t => {
	t.is(fn('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').id, '73043e0c-cba8-482a-8a8e-0b72bc580ff0');
	t.is(fn('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0?list=trending').id, '73043e0c-cba8-482a-8a8e-0b72bc580ff0');
	t.is(fn('https://web.microsoftstream.com/embed/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').id, '73043e0c-cba8-482a-8a8e-0b72bc580ff0');

	t.is(fn('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').service, 'microsoftstream');
	t.is(fn('https://web.microsoftstream.com/embed/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').service, 'microsoftstream');
});

test('gets microsoft stream metadata from iframe', t => {
	const string_ = '<iframe width="640" height="360" src="https://web.microsoftstream.com/embed/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0?autoplay=false&amp;showinfo=true" allowfullscreen style="border:none;"></iframe>';

	t.is(fn(string_).id, '73043e0c-cba8-482a-8a8e-0b72bc580ff0');
	t.is(fn(string_).service, 'microsoftstream');
});

test('microsoft stream links returns undefined id if id missing', t => {
	const object = fn('https://web.microsoftstream.com/video');
	t.is(object.id, null);
	t.is(object.service, 'microsoftstream');
});

/**
 *  TikTok should be able to find these patterns:
 *
 *  Urls:
 *  https://www.tiktok.com/@brickabrackcommunity/video/id
 *  https://www.tiktok.com/@brickabrackcommunity/video/id?
 *
 *  Not supported yet (requires a fetch):
 *  https://vm.tiktok.com/ZS9c8yNN/
 */

test('Tiktok basic link/embed', t => {
	t.is(fn('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085').id, '6950630446614990085');
	t.is(fn('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085?lang=fr&is_copy_url=1&is_from_webapp=v1').id, '6950630446614990085');
	t.is(fn('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085?sender_device=pc&sender_web_id=6930592755036374533&is_from_webapp=v1&is_copy_url=0').id, '6950630446614990085');
});

/**
 *  Dailymotion should be able to find these patterns:
 *
 *  Urls:
 *  http://www.dailymotion.com/video/id_title_text
 *  http://www.dailymotion.com/video/id
 *  http://www.dailymotion.com/fr/relevance/search/search+query/1#video=id
 *  https://www.dailymotion.com/video/id?playlist=
 *  https://www.dailymotion.com/embed/video/id?autoplay=1
 *  http://dai.ly/id
 *
 *  Not supported (channel id only):
 *  http://www.dailymotion.com/hub/id_title
 */

test('Dailymotion basic link/embed', t => {
	t.is(fn('http://www.dailymotion.com/video/x44lvd_rates-of-exchange-like-a-renegade_music').id, 'x44lvd');
	t.is(fn('http://www.dailymotion.com/video/x44lvd').id, 'x44lvd');
	t.is(fn('http://www.dailymotion.com/video/xn1bi0_hakan-yukur-klip_sport').id, 'xn1bi0');
	t.is(fn('https://www.dailymotion.com/video/x82nygx?playlist=x5nmbq').id, 'x82nygx');
	t.is(fn('https://www.dailymotion.com/embed/video/x82nygx?autoplay=1').id, 'x82nygx');
	t.is(fn('http://www.dailymotion.com/fr/relevance/search/gangnam+style/1#video=xsbwie').id, 'xsbwie');
});

test('Dailymotion returns the service', t => {
	t.is(fn('http://www.dailymotion.com/video/1234').service, 'dailymotion');
	t.is(fn('http://www.dailymotion.com/video/1234').id, '1234');
});

test('Dailymotion short link', t => {
	t.is(fn('http://dai.ly/x2no31b').id, 'x2no31b');
});

test('Dailymotion dynamic id', t => {
	t.is(fn('http://www.dailymotion.com/fr/relevance/search/gangnam+style/1#video=xsbwie').id, 'xsbwie');
	t.is(fn('http://www.dailymotion.com/hub/x9q_Galatasaray#video=xjw21s').id, 'xjw21s');
});

test('Dailymotion iframe', t => {
	const actual = fn('<iframe src="https://www.dailymotion.com/embed/video/12780" width="600" height="600"></iframe>');
	t.is(actual.id, '12780');
	t.is(actual.service, 'dailymotion');
});
