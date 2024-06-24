/* istanbul ignore file */
/* eslint-disable unicorn/prefer-module */
const getVideoId = require('../../dist/get-video-id.umd.js');

describe('bundled umd module', () => {
	test('has the expected API', () => {
		expect(typeof getVideoId).toBe('function');
		expect(getVideoId('https://www.youtube.com/watch?v=1234').id).toBe('1234');
		expect(getVideoId('https://www.loom.com/share/1234').id).toBe('1234');
		expect(getVideoId('http://www.dailymotion.com/video/dailymotionid_foo_bar').id).toBe('dailymotionid');
		expect(getVideoId('https://web.microsoftstream.com/video/foo').id).toBe('foo');
		expect(getVideoId('https://www.tiktok.com/@example/video/1100000000000000000').id).toBe('1100000000000000000');
		expect(getVideoId('https://videopress.com/v/12345678').id).toBe('12345678');
		expect(getVideoId('https://player.vimeo.com/video/123450987').id).toBe('123450987');
		expect(getVideoId('https://vine.co/v/vineid').id).toBe('vineid');
	});
});
