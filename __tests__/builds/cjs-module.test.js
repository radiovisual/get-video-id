/* istanbul ignore file */
/* eslint-disable unicorn/prefer-module */
const getVideoId = require('../../dist/get-video-id.js');

describe('bundled CJS module', () => {
	test('has the expected API', () => {
		expect(typeof getVideoId).toBe('function');
		expect(getVideoId('https://www.youtube.com/watch?v=1234').id).toBe('1234');
	});
});
