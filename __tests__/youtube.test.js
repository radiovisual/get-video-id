/* eslint max-len: 0 */
import fn from '../dist/get-video-id.js';

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

describe('Youtube', () => {
	test('gets youtube metadata from iframe', () => {
		const expected = {
			service: 'youtube',					id: '1234',
		};
		const string_ = '<iframe width="560" height="315" src="https://www.youtube.com/embed/1234" frameborder="0" allowfullscreen></iframe>';

		const actual = fn(string_);
		expect(actual).toMatchObject(expected);
	});

	test('gets metadata from youtube shortcode formats', () => {
		expect(fn('youtube://1234').id).toBe('1234');
		expect(fn('https://youtu.be/ABC12302').id).toBe('ABC12302');
		expect(fn('http://youtu.be/ABC12303').id).toBe('ABC12303');
		expect(fn('http://youtu.be/ABC12304?feature=youtube_gdata_player').id).toBe('ABC12304');
		expect(fn('http://y2u.be/ABC12304').id).toBe('ABC12304');

		expect(fn('http://youtu.be/ABC12304?feature=youtube_gdata_player').service).toBe('youtube');
	});

	test('handles youtube v= and vi= formats', () => {
		expect(fn('http://www.youtube.com/ytscreeningroom?v=ABC1230').id).toBe('ABC1230');
		expect(fn('https://www.youtube.com/watch?v=ABC12301').id).toBe('ABC12301');
		expect(fn('http://www.youtube.com/watch?v=ABC12302&list=abc123&index=2&feature=plpp_video').id).toBe('ABC12302');
		expect(fn('http://www.youtube.com/watch?v=ABC12303&feature=channel').id).toBe('ABC12303');
		expect(fn('http://www.youtube.com/watch?v=ABC12304&playnext_from=TL&videos=abc123&feature=sub').id).toBe('ABC12304');
		expect(fn('http://www.youtube.com/watch?v=ABC12305&feature=channel').id).toBe('ABC12305');
		expect(fn('http://www.youtube.com/watch?v=ABC12306&playnext_from=TL&videos=abc123&feature=sub').id).toBe('ABC12306');
		expect(fn('http://www.youtube.com/watch?v=ABC12307').id).toBe('ABC12307');
		expect(fn('http://youtube.com/?v=ABC12308&feature=youtube_gdata_player').id).toBe('ABC12308');
		expect(fn('http://youtube.com/?vi=ABC12309&feature=youtube_gdata_player').id).toBe('ABC12309');
		expect(fn('http://youtube.com/watch?v=ABC12310&feature=youtube_gdata_player').id).toBe('ABC12310');
		expect(fn('http://youtube.com/watch?vi=ABC12311&feature=youtube_gdata_player').id).toBe('ABC12311');
		expect(fn('http://www.youtube.com/watch?v=ABC12312&feature=youtube_gdata_player').id).toBe('ABC12312');
		expect(fn('http://www.youtube.com/watch?v=ABC12313&feature=youtu.be').id).toBe('ABC12313');

		expect(fn('http://www.youtube.com/watch?v=ABC12306&playnext_from=TL&videos=abc123&feature=sub').service).toBe('youtube');
	});

	test('handles youtube /v/ and /vi/ formats', () => {
		expect(fn('http://www.youtube.com/v/ABC1230').id).toBe('ABC1230');
		expect(fn('http://youtube.com/v/ABC12301?feature=youtube_gdata_player').id).toBe('ABC12301');
		expect(fn('http://youtube.com/vi/ABC12302?feature=youtube_gdata_player').id).toBe('ABC12302');
		expect(fn('https://i.ytimg.com/vi/0okagl9U2eo/hqdefault.jpg').id).toBe('0okagl9U2eo');
		expect(fn('http://youtube.com/vi/ABC12302?feature=youtube_gdata_player').service).toBe('youtube');
	});

	test('handles youtube image /an_webp/{id}/ formats', () => {
		expect(fn('https://i.ytimg.com/an_webp/MYDcdp-VNmQ/mqdefault_6s.webp').id).toBe('MYDcdp-VNmQ');
	});

	test('handles youtube /embed/ formats', () => {
		expect(fn('https://www.youtube.com/embed/ABC1230').id).toBe('ABC1230');
		expect(fn('www.youtube-nocookie.com/embed/ABC12301?rel=0').id).toBe('ABC12301');
		expect(fn('http://www.youtube.com/embed/ABC12302?rel=0').id).toBe('ABC12302');

		expect(fn('http://www.youtube.com/embed/ABC12302?rel=0').service).toBe('youtube');
	});

	test('handles youtube /user/ formats', () => {
		expect(fn('http://www.youtube.com/user/username#p/u/1/ABC1230').id).toBe('ABC1230');
		expect(fn('http://www.youtube.com/user/username#p/a/u/2/ABC12301').id).toBe('ABC12301');
		expect(fn('http://www.youtube.com/user/username#p/u/1/ABC12302?rel=0').id).toBe('ABC12302');

		expect(fn('http://www.youtube.com/user/username#p/u/1/ABC12302?rel=0').service).toBe('youtube');
		expect(fn('https://youtube.com/user/WMFinland#p/a/u/1/G-3YxlZIhus').id).toBe('G-3YxlZIhus');
	});

	test('ignores youtube.com/user/* patterns', () => {
		expect(fn('https://www.youtube.com/user/ThreeDaysGraceVideos').id).toBe(undefined);
	});

	test('returns id:undefined with /user/ format that does not have a video id', () => {
		expect(fn('https://www.youtube.com/user/ThreeDaysGraceVideos/videos').id).toBe(undefined);
	});

	test('removes -nocookie', () => {
		expect(fn('http://www.youtube-nocookie.com/ytscreeningroom?v=ABC12300').id).toBe('ABC12300');
		expect(fn('http://www.youtube-nocookie.com/v/ABC12301').id).toBe('ABC12301');
		expect(fn('http://www.youtube-nocookie.com/user/username#p/u/1/ABC12302').id).toBe('ABC12302');
		expect(fn('https://www.youtube-nocookie.com/embed/ABC12303').id).toBe('ABC12303');

		expect(fn('http://www.youtube-nocookie.com/user/username#p/u/1/ABC12302').service).toBe('youtube');
	});

	test('handles youtube attribution_links', () => {
		expect(fn('http://www.youtube.com/attribution_link?u=%2Fwatch%3Fv%3DABC12300%26feature%3Dshare&a=JdfC0C9V6ZI').id).toBe('ABC12300');
		expect(fn('https://www.youtube.com/attribution_link?a=JdfC0C9V6ZI&u=%2Fwatch%3Fv%3DABC12301%26feature%3Dshare').id).toBe('ABC12301');
		expect(fn('http://www.youtube.com/attribution_link?u=/watch?v=ABC12302&feature=share&list=UUsnCjinFcybOuyJU1NFOJmg&a=LjnCygXKl21WkJdyKu9O-w').id).toBe('ABC12302');
		expect(fn('http://www.youtube.com/attribution_link?u=/watch?v=ABC12303&feature=share&a=9QlmP1yvjcllp0h3l0NwuA').id).toBe('ABC12303');
		expect(fn('http://www.youtube.com/attribution_link?a=fF1CWYwxCQ4&u=/watch?v=ABC12304&feature=em-uploademail').id).toBe('ABC12304');
		expect(fn('http://www.youtube.com/attribution_link?a=fF1CWYwxCQ4&feature=em-uploademail&u=/watch?v=ABC12305').id).toBe('ABC12305');
		expect(fn('http://www.youtube.com/attribution_link?u=/watch?v=ABC12302&feature=share&list=UUsnCjinFcybOuyJU1NFOJmg&a=LjnCygXKl21WkJdyKu9O-w').service).toBe('youtube');
	});

	test('youtube links returns undefined id if id missing', () => {
		const object = fn('https://www.youtube.com');
		expect(object.id).toBe(undefined);
		expect(object.service).toBe('youtube');
	});

	test('removes time hash at end of string ', () => {
		expect(fn('https://www.youtube.com/watch?v=G-3YxlZIhus#t=0m10s').id).toBe('G-3YxlZIhus');
		expect(fn('http://www.youtube.com/watch?v=G-3YxlZIhus#t=0m10s').id).toBe('G-3YxlZIhus');
		expect(fn('http://www.youtube.com/watch?v=G-3YxlZIhus#t=0m10s').service).toBe('youtube');
	});

	test('removes trailing parameters from youtube urls', () => {
		expect(fn('http://youtu.be/G-3YxlZIhus&feature=channel').id).toBe('G-3YxlZIhus');
		expect(fn('http://youtube.com/vi/G-3YxlZIhus&feature=channel').id).toBe('G-3YxlZIhus');
		expect(fn('http://youtube.com/vi/G-3YxlZIhus&feature=channel').service).toBe('youtube');
		expect(fn('http://youtube.com/vi/G-3YxlZIhus&feature=share').id).toBe('G-3YxlZIhus');
		expect(fn('http://youtube.com/vi/G-3YxlZIhus&foo=bar').id).toBe('G-3YxlZIhus');
	});

	/**
	* Google redirect patterns:
	*
	*  https://google.cz/url?source=web&url=id
	*  https://google.com/image?url=id
	*
	*/

	test('handles google redirection to youtube', () => {
		const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeG1uDU0rSLw&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA';
		expect(fn(url).id).toBe('eG1uDU0rSLw');
		expect(fn(url).service).toBe('youtube');
	});
});
