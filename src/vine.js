/**
 * Get the vine id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function vine(string_) {
	const regex = /https:\/\/vine\.co\/v\/([a-zA-Z\d]*)\/?/;
	const matches = regex.exec(string_);
	return matches && matches[1];
}
