import sanitizeUrl from '../../src/utils/sanitize-url.js';

describe('sanitize-url', () => {
	test('returns the URL without modification for valid URL strings', () => {
		const url = 'https://example.com';
		expect(sanitizeUrl(url)).toBe(url);
	});

	test('throws TypeError for non-string inputs', () => {
		const input = 123;
		expect(() => sanitizeUrl(input)).toThrow(TypeError);
	});

	test('trims leading or trailing spaces', () => {
		const url = ' https://example.com ';
		expect(sanitizeUrl(url)).toBe('https://example.com');
	});

	test('removes leading "www."', () => {
		const url = 'https://www.example.com';
		expect(sanitizeUrl(url)).toBe('https://example.com');
	});

	test('extracts src from an iframe input', () => {
		const iframeHtml = '<iframe src="https://example.com"></iframe>';
		expect(sanitizeUrl(iframeHtml)).toBe('https://example.com');
	});

	test('returns an empty string when getSrc returns undefined for an iframe', () => {
		const iframeHtml = '<iframe></iframe>';
		expect(sanitizeUrl(iframeHtml)).toBe('');
	});
});
