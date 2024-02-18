import extractGoogleRedirectionUrl from '../../src/utils/extract-google-redirection-url.js';

describe('extractGoogleRedirectionUrl', () => {
	test('throws TypeError if input is not a string', () => {
		expect(() => extractGoogleRedirectionUrl(123)).toThrow(TypeError);
		expect(() => extractGoogleRedirectionUrl({})).toThrow(TypeError);
		expect(() => extractGoogleRedirectionUrl([])).toThrow(TypeError);
	});

	test('returns input as is if it does not contain Google redirect URL', () => {
		const nonGoogleUrl = 'https://www.example.com';
		expect(extractGoogleRedirectionUrl(nonGoogleUrl)).toBe(nonGoogleUrl);
	});

	test('extracts and decodes URL from a Google redirect URL', () => {
		const expectedUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		const googleRedirectUrl = `https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=123&url=${encodeURIComponent(expectedUrl)}`;
		expect(extractGoogleRedirectionUrl(googleRedirectUrl)).toBe(expectedUrl);
	});

	test('returns trimmed input if it does not match Google redirect pattern', () => {
		const nonMatchingUrl = '     https://www.google.com/search?q=openai    ';
		expect(extractGoogleRedirectionUrl(nonMatchingUrl)).toBe(nonMatchingUrl.trim());
	});

	test('returns input as-is if the value is not a URL', () => {
		const nonMatchingUrl = 'lorem ipsum';
		expect(extractGoogleRedirectionUrl(nonMatchingUrl)).toBe(nonMatchingUrl);
	});
});
