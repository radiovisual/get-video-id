/* eslint max-len: 0 */
import fn from '../src/index.js';

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

describe('Vine', () => {
	test('gets vine metadata from url', () => {
		expect(fn('https://vine.co/v/e5vIvmV5v9J').id).toBe('e5vIvmV5v9J');
		expect(fn('https://vine.co/v/e5vIvmV5v9J/').id).toBe('e5vIvmV5v9J');
		expect(fn('https://vine.co/v/e5vIvmV5v9J/embed').id).toBe('e5vIvmV5v9J');
		expect(fn('https://vine.co/v/e5vIvmV5v9J/card?api=1/').id).toBe('e5vIvmV5v9J');
		expect(fn('https://vine.co/v/bjpPT1xwg6B/embed/simple').id).toBe('bjpPT1xwg6B');
		expect(fn('https://vine.co/v/bjpPT1xwg6B/embed/postcard?audio=1').id).toBe('bjpPT1xwg6B');

		expect(fn('https://vine.co/v/e5vIvmV5v9J/').service).toBe('vine');
		expect(fn('https://vine.co/v/bjpPT1xwg6B/embed/postcard?audio=1').service).toBe('vine');
	});

	test('gets vine metadata from iframe', () => {
		const string_ = '<iframe src="https://vine.co/v/bjpPT1xwg6B/embed/simple" width="600" height="600" frameborder="0"></iframe>';

		expect(fn(string_).id).toBe('bjpPT1xwg6B');
		expect(fn(string_).service).toBe('vine');
	});

	test('gets vine metadata from postcard iframe', () => {
		const string_ = '<iframe src="https://vine.co/v/bjpPT1xwg6B/embed/postcard" width="600" height="600" frameborder="0"></iframe>';

		expect(fn(string_).id).toBe('bjpPT1xwg6B');
		expect(fn(string_).service).toBe('vine');
	});

	test('vine links returns undefined id if id missing', () => {
		const object = fn('https://vine.co');
		expect(object.id).toBeUndefined();
		expect(object.service).toBe('vine');
	});
});
