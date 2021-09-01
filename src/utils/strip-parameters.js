/**
 * Strip away any parameters following `?` or `/` or '&'
 * @param str
 * @returns {String}
 */
export default function stripParameters(string_) {
	// Split parameters or split folder separator
	if (string_.includes('?')) {
		return string_.split('?')[0];
	}

	if (string_.includes('/')) {
		return string_.split('/')[0];
	}

	if (string_.includes('&')) {
		return string_.split('&')[0];
	}

	return string_;
}
