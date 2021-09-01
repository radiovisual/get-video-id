/**
 * Get the tiktok id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function tiktok(string_) {
	// Parse basic url and embeds
	const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
	const basicParsed = basicReg.exec(string_);
	if (basicParsed && basicParsed.length > 2) {
		return basicParsed[2];
	}

	return undefined;
}
