/**
 * Get the Microsoft Stream id.
 * @param {string} urlString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function microsoftStream(urlString) {
	const regex = (urlString.includes('embed'))
		? /https:\/\/web\.microsoftstream\.com\/embed\/video\/([a-zA-Z\d-]*)\/?/
		: /https:\/\/web\.microsoftstream\.com\/video\/([a-zA-Z\d-]*)\/?/;
	const matches = regex.exec(urlString);

	if (matches && matches.length > 1) {
		return matches[1];
	}

	return undefined;
}
