import test from 'ava';
import getVideoId from '../dist/get-video-id.js';

test('works in a browser', t => {
	const expectedId = '123450987';

	t.is(typeof getVideoId, 'function');
	t.is(getVideoId(`https://player.vimeo.com/video/${expectedId}`).id, expectedId);
	t.is(getVideoId(`https://player.vimeo.com/video/${expectedId}`).service, 'vimeo');
});
