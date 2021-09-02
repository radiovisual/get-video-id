/**
 * Get the tiktok id.
 * @param {string} urlString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function tiktok(urlString) {
	// Parse basic url and embeds
	const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
	const basicParsed = basicReg.exec(urlString);
	if (basicParsed && basicParsed.length > 2) {
		return basicParsed[2];
	}

	return undefined;
}
