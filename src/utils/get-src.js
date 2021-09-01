
/**
 * Get the value assigned to a "src" attribute in a string, or undefined.
 * @param {String} input
 * @returns {String|undefined}
 */
export default function getSrc(input) {
	if (typeof input !== 'string') {
		throw new TypeError('getSrc expected a string');
	}

	const srcRegEx = /src="(.*?)"/gm;
	const matches = srcRegEx.exec(input);

	if (matches && matches.length >= 2) {
		return matches[1];
	}

	return undefined;
}
