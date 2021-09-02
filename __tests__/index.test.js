/* eslint max-len: 0 */
import fn from '../src/index.js';

test('expects a string', () => {
	expect(() => {
		fn({});
	}).toThrow(/get-video-id expects a string/);
});

test('returns null as id and service', () => {
	const expected = {
		id: null,
		service: null,
	};
	expect(fn('foo')).toMatchObject(expected);
});
