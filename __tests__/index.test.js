/* eslint max-len: 0 */
import fn from '../src/index.js';

test('expects a string', () => {
	expect(() => {
		fn({});
	}).toThrow(/get-video-id expects a string/);
});

test('returns undefined as id and service', () => {
	const expected = {
		id: undefined,
		service: undefined,
	};
	expect(fn('foo')).toMatchObject(expected);
	expect(fn('<iframe')).toMatchObject(expected);
	expect(fn('')).toMatchObject(expected);
});
