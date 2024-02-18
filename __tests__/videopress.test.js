/* eslint max-len: 0 */
import fn from '../src/index.js';

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

describe('Videopress', () => {
	test('gets videopress metadata from url', () => {
		expect(fn('https://videopress.com/v/dyrgndFq').id).toBe('dyrgndFq');
		expect(fn('https://videopress.com/v/dyrgndFq#fullscreen').id).toBe('dyrgndFq');
		expect(fn('https://videopress.com/embed/zcnJVzQz?hd=0&autoPlay=0&permalink=0&loop=0').id).toBe('zcnJVzQz');

		expect(fn('https://videopress.com/embed/zcnJVzQz?hd=0&autoPlay=0&permalink=0&loop=0').service).toBe('videopress');
	});

	test('gets videopress metadata from iframe', () => {
		const string_ = '<iframe width="400" height="300" src="https://videopress.com/embed/zcnJVzQz?hd=0&amp;autoPlay=0&amp;permalink=0&amp;loop=0" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>';
		expect(fn(string_).id).toBe('zcnJVzQz');
		expect(fn(string_).service).toBe('videopress');
	});

	test('videopress links returns undefined id if id missing', () => {
		const object = fn('https://videopress.com');
		expect(object.id).toBeUndefined();
		expect(object.service).toBe('videopress');
	});
});
