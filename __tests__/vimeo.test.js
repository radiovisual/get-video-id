/* eslint max-len: 0 */
import fn from '../src/index.js';

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

describe('Vimeo', () => {
	test('gets vimeo metadata from url', () => {
		expect(fn('https://player.vimeo.com/video/123450987').id).toBe('123450987');
		expect(fn('https://vimeo.com/1230897').id).toBe('1230897');
		expect(fn('https://vimeo.com/140542479#t=0m3s').id).toBe('140542479');
		expect(fn('https://player.vimeo.com/video/176337266?color=ffffff&title=0&byline=0&portrait=0&badge=0').id).toBe('176337266');

		expect(fn('https://player.vimeo.com/video/123450987#t=0m3s').service).toBe('vimeo');
		expect(fn('https://vimeo.com/123450987/randomhash').service).toBe('vimeo');
		expect(fn('https://vimeo.com/123450987/randomhash').id).toBe('123450987');
	});

	test('gets vimeo metadata from iframe', () => {
		const string_ = '<iframe src="https://player.vimeo.com/video/97682350" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/97682350">Todo list application utilizing the Swift programming language</a> from <a href="https://vimeo.com/user27750098">Rex Fatahi</a> on <a href="https://vimeo.com">Vimeo</a>.</p>';
		expect(fn(string_).id).toBe('97682350');
		expect(fn(string_).service).toBe('vimeo');
	});

	test('handles [uncommon] leading \'www\' in vimeo urls', () => {
		expect(fn('https://www.vimeo.com/187191771').id).toBe('187191771');
		expect(fn('https://www.vimeo.com/187191771').service).toBe('vimeo');
		expect(fn('<iframe src="https://www.player.vimeo.com/video/97682350" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').id).toBe('97682350');
		expect(fn('https://www.player.vimeo.com/video/123450987').id).toBe('123450987');
		expect(fn('https://www.vimeo.com/1230897').id).toBe('1230897');
		expect(fn('https://www.vimeo.com/140542479#t=0m3s').id).toBe('140542479');
		expect(fn('https://www.player.vimeo.com/video/176337266?color=ffffff&title=0&byline=0&portrait=0&badge=0').id).toBe('176337266');
		expect(fn('https://www.player.vimeo.com/video/123450987#t=0m3s').service).toBe('vimeo');
		expect(fn('https://www.vimeo.com/123450987/randomhash').id).toBe('123450987');
	});

	test('handles vimeo channel, groups, albums url patterns', () => {
		expect(fn('https://vimeo.com/channels/1234').id).toBe('1234');
		expect(fn('https://vimeo.com/channels/yourchannel/12345').id).toBe('12345');
		expect(fn('https://vimeo.com/groups/name/videos/123456').id).toBe('123456');
		expect(fn('https://vimeo.com/album/album_id/video/1234567').id).toBe('1234567');
	});

	test('handles swf embed patterns', () => {
		expect(fn('http://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').id).toBe('1234');
		expect(fn('https://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').id).toBe('1234');
		expect(fn('http://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').service).toBe('vimeo');
		expect(fn('https://vimeo.com/name.swf?clip_id=1234&server=vimeo.com&show_title=0&show_byline=0&show_portrait=0&color=00adef&fullscreen=1').service).toBe('vimeo');
		expect(fn('http://vimeo.com/name.swf?clip_id=1234').id).toBe('1234');
		expect(fn('https://vimeo.com/name.swf?clip_id=1234').id).toBe('1234');
		expect(fn('http://vimeo.com/name.swf?clip_id=1234').service).toBe('vimeo');
		expect(fn('https://vimeo.com/name.swf?clip_id=1234').service).toBe('vimeo');
	});

	test('handles vimeo events patterns', () => {
		expect(fn('https://vimeo.com/event/12345').id).toBe('12345');
		expect(fn('https://vimeo.com/event/12345').service).toBe('vimeo');
	});

	test('vimeo links returns undefined id if id missing', () => {
		const object = fn('https://www.vimeo.co');
		expect(object.id).toBeUndefined();
		expect(object.service).toBe('vimeo');
	});

	test('handles google redirection to vimeo', () => {
		const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&url=https%3A%2F%2Fvimeo.com%2F35652044&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw';
		expect(fn(url).id).toBe('35652044');
		expect(fn(url).service).toBe('vimeo');
	});
});
