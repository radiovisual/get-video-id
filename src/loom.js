/**
 * Get the loom id.
 * @param {string} urlString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function loom(urlString) {
	// Parse basic url and embeds
	const basicReg
		= /(https?:\/\/)?(www\.)?loom\.com\/?(.*\/)?([\d)([a-z]{32})\??.*/;
	const basicParsed = urlString.match(basicReg);
	if (basicParsed && basicParsed.length === 5) {
		return basicParsed[4];
	}

	return undefined;
}
