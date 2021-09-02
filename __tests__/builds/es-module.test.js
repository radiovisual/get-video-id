/* istanbul ignore file */
import getVideoId from '../../dist/get-video-id.esm.js';

describe('bundled ES module', () => {
	test('has the expected API', () => {
		expect(getVideoId).toBeInstanceOf(Function);
		expect(getVideoId('https://www.youtube.com/watch?v=1234').id).toBe('1234');
	});
});
