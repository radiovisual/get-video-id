/**
 * Get the VideoPress id.
 * @param {string} urlString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function videopress(urlString) {
	let idRegex;

	if (urlString.includes('embed')) {
		idRegex = /embed\/(\w{8})/;
		return urlString.match(idRegex)[1];
	}

	idRegex = /\/v\/(\w{8})/;

	const matches = urlString.match(idRegex);

	if (matches && matches.length > 0) {
		return matches[1];
	}

	return undefined;
}
