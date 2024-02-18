/**
 * Extract the url query parameter from a Google redirect url.
 *
 * @example
 * ```javascript
 * const url = extractGoogleRedirectionUrl('https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ')
 * // => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
 * ```
 * @param {String} input
 * @returns {String}
 */
export default function extractGoogleRedirectionUrl(input) {
	if (typeof input !== 'string') {
		throw new TypeError(`extractGoogleRedirectionUrl expected a string, got ${typeof input}`);
	}

	const string_ = input.trim();

	// Try to handle google redirection uri
	if (/\/\/google|www\.google/.test(string_)) {
		try {
			const urlObject = new URL(input);

			const parameters = new URLSearchParams(urlObject.search);
			const extractedUrl = parameters.get('url');

			if (extractedUrl) {
				return decodeURIComponent(extractedUrl);
			}
		} catch {
			// If there's an error (e.g., input is not a valid URL), return the trimmed input
			return string_;
		}
	}

	return string_;
}

