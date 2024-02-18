import fn from '../../src/utils/get-src.js';

describe('get-src', () => {
	test('expects a string', () => {
		expect(() => {
			fn();
		}).toThrow(/getSrc expected a string/);
	});

	test('extracts the src from iframe strings', () => {
		expect(fn('<iframe src="https://player.vimeo.com/video/abc123"')).toBe('https://player.vimeo.com/video/abc123');
		expect(fn('<iframe src="https://videopress.com/embed/abc123"')).toBe('https://videopress.com/embed/abc123');
		expect(fn('  <iframe src="https://videopress.com/embed/abc123"  ')).toBe('https://videopress.com/embed/abc123');
		expect(fn('  <iframe src="https://videopress.com/embed/abc123"')).toBe('https://videopress.com/embed/abc123');
		expect(fn('<iframe width="400" height="300" src="video.mp4"></iframe>')).toBe('video.mp4');
	});

	test('extracts the source from simple strings', () => {
		expect(fn('src="abc123"')).toBe('abc123');
		expect(fn('     src="abc123"     ')).toBe('abc123');
		expect(fn('     src="abc123"')).toBe('abc123');
		expect(fn('src="abc123"   ')).toBe('abc123');
	});

	test('extracts the source from html strings', () => {
		expect(fn('<image src="image.png" />')).toBe('image.png');
		expect(fn('<source src="audio.mp3" />')).toBe('audio.mp3');
	});

	test('returns undefined when no src= is found', () => {
		expect(fn('hello')).toBeUndefined();
		expect(fn('<iframe')).toBeUndefined();
	});

	test('single quotes return undefined', () => {
		expect(fn(' src=\'noop\' ')).toBeUndefined();
	});
});
