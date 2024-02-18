/**
 * Get the loom id.
 * @param {string} urlString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function loom(urlString) {
	const regex = /^https?:\/\/(?:www\.)?loom\.com\/(?:share|embed)\/([\da-zA-Z]+)\/?/;
	const matches = regex.exec(urlString);

	if (matches && matches.length > 1) {
		return matches[1];
	}

	return undefined;
}
