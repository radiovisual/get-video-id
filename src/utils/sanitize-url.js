import getSrc from './get-src.js';

/**
 * Prepare the URL by doing common cleanup operations common for all URL types.
 * @param {String} input
 * @returns {String}
 */
export default function sanitizeUrl(input) {
	if (typeof input !== 'string') {
		throw new TypeError(`sanitizeUrl expected a string, got ${typeof input}`);
	}

	let string_ = input;

	if (/<iframe/gi.test(string_)) {
		string_ = getSrc(string_) || '';
	}

	// Remove surrounding whitespaces or linefeeds
	string_ = string_.trim();

	// Remove any leading `www.`
	string_ = string_.replace('/www.', '/');

	return string_;
}
