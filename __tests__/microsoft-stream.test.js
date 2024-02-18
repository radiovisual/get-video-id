/* eslint max-len: 0 */
import fn from '../src/index.js';

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
describe('Microsoft Stream', () => {
	test('gets microsoft stream from url', () => {
		expect(fn('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').id).toBe('73043e0c-cba8-482a-8a8e-0b72bc580ff0');
		expect(fn('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0?list=trending').id).toBe('73043e0c-cba8-482a-8a8e-0b72bc580ff0');
		expect(fn('https://web.microsoftstream.com/embed/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').id).toBe('73043e0c-cba8-482a-8a8e-0b72bc580ff0');

		expect(fn('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').service).toBe('microsoftstream');
		expect(fn('https://web.microsoftstream.com/embed/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0').service).toBe('microsoftstream');
	});

	test('gets microsoft stream metadata from iframe', () => {
		const string_ = '<iframe width="640" height="360" src="https://web.microsoftstream.com/embed/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0?autoplay=false&amp;showinfo=true" allowfullscreen style="border:none;"></iframe>';

		expect(fn(string_).id).toBe('73043e0c-cba8-482a-8a8e-0b72bc580ff0');
		expect(fn(string_).service).toBe('microsoftstream');
	});

	test('microsoft stream links returns undefined id if id missing', () => {
		const object = fn('https://web.microsoftstream.com/video');
		expect(object.id).toBeUndefined();
		expect(object.service).toBe('microsoftstream');
	});
});
