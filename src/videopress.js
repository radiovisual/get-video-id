/**
 * Get the VideoPress id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function videopress(string_) {
	let idRegex;

	if (string_.includes('embed')) {
		idRegex = /embed\/(\w{8})/;
		return string_.match(idRegex)[1];
	}

	idRegex = /\/v\/(\w{8})/;

	const match = string_.match(idRegex);

	if (match && match.length > 0) {
		return string_.match(idRegex)[1];
	}

	return undefined;
}
