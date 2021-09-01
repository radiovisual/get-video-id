/**
 * Get the Microsoft Stream id.
 * @param {string} string_ - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function microsoftStream(string_) {
	const regex = (string_.includes('embed'))
		? /https:\/\/web\.microsoftstream\.com\/embed\/video\/([a-zA-Z\d-]*)\/?/
		: /https:\/\/web\.microsoftstream\.com\/video\/([a-zA-Z\d-]*)\/?/;
	const matches = regex.exec(string_);
	return matches && matches[1];
}
