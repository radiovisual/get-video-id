import test from 'ava';
import fn from './';

test('expects a string', t => {
	t.throws(() => {
		fn({});
	}, 'get-video-id expects a string');
});

/**
 *  Vimeo should be able to find these patterns:
 *
 *  // urls
 * 	https://vimeo.com/*
 *  https://player.vimeo.com/video/*
 *  https://vimeo.com/*?
 *  https://www.vimeo.com/*?
 *  https://www.vimeo.com/*
 *
 *  // iframe
 *  <iframe src="https://player.vimeo.com/video/97682350"
 *
 *  // channels groups and albums
 *  https://vimeo.com/channels/*
 *  https://vimeo.com/channels/yourchannel/*
 *  https://vimeo.com/groups/name/videos/*
 *  https://vimeo.com/album/album_id/video/*
 *
 */

test('gets vimeo metadata from url', t => {
	t.is(fn('https://player.vimeo.com/video/123450987').id, '123450987');
	t.is(fn('https://vimeo.com/1230897').id, '1230897');
	t.is(fn('https://vimeo.com/140542479#t=0m3s').id, '140542479');
	t.is(fn('https://player.vimeo.com/video/176337266?color=ffffff&title=0&byline=0&portrait=0&badge=0').id, '176337266');

	t.is(fn('https://player.vimeo.com/video/123450987#t=0m3s').service, 'vimeo');
});

test('gets vimeo metadata from iframe', t => {
	const str = '<iframe src="https://player.vimeo.com/video/97682350" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/97682350">Todo list application utilizing the Swift programming language</a> from <a href="https://vimeo.com/user27750098">Rex Fatahi</a> on <a href="https://vimeo.com">Vimeo</a>.</p>';
	t.is(fn(str).id, '97682350');
	t.is(fn(str).service, 'vimeo');
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
});

test('handles vimeo channel, groups, albums url patterns', t => {
	t.is(fn('https://vimeo.com/channels/1234').id, '1234');
	t.is(fn('https://vimeo.com/channels/yourchannel/12345').id, '12345');
	t.is(fn('https://vimeo.com/groups/name/videos/123456').id, '123456');
	t.is(fn('https://vimeo.com/album/album_id/video/1234567').id, '1234567');
});

/**
 *  VideoPress should be able to find these patterns:
 *
 *  // urls
 *  https://videopress.com/v/*
 *  https://videopress.com/embed/*
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
	var str = '<iframe width="400" height="300" src="https://videopress.com/embed/zcnJVzQz?hd=0&amp;autoPlay=0&amp;permalink=0&amp;loop=0" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>';
	t.is(fn(str).id, 'zcnJVzQz');
	t.is(fn(str).service, 'videopress');
});

/**
 *  Vine should be able to find these patterns:
 *
 *  // urls
 *  https://vine.co/v/*
 *
 *  // iframe
 *  <iframe src="https://vine.co/v/bjpPT1xwg6B/embed/simple"
 *  <iframe src="https://vine.co/v/bjpPT1xwg6B/embed/postcard"
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
	const str = '<iframe src="https://vine.co/v/bjpPT1xwg6B/embed/simple" width="600" height="600" frameborder="0"></iframe>';

	t.is(fn(str).id, 'bjpPT1xwg6B');
	t.is(fn(str).service, 'vine');
});

test('gets vine metadata from postcard iframe', t => {
	const str = '<iframe src="https://vine.co/v/bjpPT1xwg6B/embed/postcard" width="600" height="600" frameborder="0"></iframe>';

	t.is(fn(str).id, 'bjpPT1xwg6B');
	t.is(fn(str).service, 'vine');
});

/**
 * Youtube should be able to find these patterns:
 *
 *  // shortcodes
 *  http://youtu.be/*?
 *  https://youtu.be/*
 *  http://youtu.be/*
 *  youtube://
 *
 *  // /v/ or /vi/
 *  http://www.youtube.com/v/*
 *  http://youtube.com/vi/*?
 *  http://youtube.com/v/*?
 *
 *  // v= or vi=
 *  http://www.youtube.com/ytscreeningroom?v=*
 *  http://www.youtube.com/watch?v=*?&
 *  https://www.youtube.com/watch?v=*
 *  http://youtube.com/watch?vi=*&
 *  http://youtube.com/?vi=*&
 *  http://youtube.com/?v=*
 *
 *  // embed
 *  http://www.youtube.com/embed/*?
 *  www.youtube-nocookie.com/embed/*?
 *  https://www.youtube.com/embed/*
 *
 *  // user
 *  http://www.youtube.com/user/username#p/a/u/2/*
 *  http://www.youtube.com/user/username#p/u/1/*?
 *  http://www.youtube.com/user/username#p/u/1/*
 *
 *  // iframe embed
 *  <iframe width="560" height="315" src="https://www.youtube.com/embed/*" frameborder="0" allowfullscreen></iframe>
 *
 *  // attribution_link
 *  http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3D*%26
 *  https://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3D*%26
 *
 */

test('gets youtube metadata from iframe', t => {
	const str = '<iframe width="560" height="315" src="https://www.youtube.com/embed/97682350" frameborder="0" allowfullscreen></iframe>';

	t.is(fn(str).id, '97682350');
	t.is(fn(str).service, 'youtube');
});

test('gets metadata from youtube shortcode formats', t => {
	t.is(fn('youtube://ABC12301').id, 'ABC12301');
	t.is(fn('https://youtu.be/ABC12302').id, 'ABC12302');
	t.is(fn('http://youtu.be/ABC12303').id, 'ABC12303');
	t.is(fn('http://youtu.be/ABC12304?feature=youtube_gdata_player').id, 'ABC12304');

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

/**
 * Google redirect patterns:
 *
 *  https://google.cz/url?source=web&url=*
 *  https://google.com/image?url=*
 *
 */

test('handles google redirection to youtube', t => {
	t.is(fn('https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeG1uDU0rSLw&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA').id, 'eG1uDU0rSLw');
	t.is(fn('https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIKDAB&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DtcaUcL8MiKk&usg=AFQjCNFrjHwQiaZ6q-w83GkDd9bNyRQvMw').id, 'tcaUcL8MiKk');
});

test('handles google redirection to vimeo', t => {
	t.is(fn('https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&url=https%3A%2F%2Fvimeo.com%2F35652044&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw').id, '35652044');
});

test('google link returns undefined if missing url parameter', t => {
	t.is(fn('https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw'), undefined);
});
