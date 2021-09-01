/**
 * Get the dailymotion id.
 * @param {string} urlString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function dailymotion(urlString) {
	// Parse basic url and embeds
	const basicReg = /dailymotion\.com(.*)(video)\/([a-zA-Z\d]+)/gm;
	const basicParsed = basicReg.exec(urlString);
	if (basicParsed) {
		return basicParsed[3];
	}

	// Parse shortlink
	const shortRegex = /dai\.ly\/([a-zA-Z\d]+)/gm;
	const shortParsed = shortRegex.exec(urlString);
	if (shortParsed && shortParsed.length > 1) {
		return shortParsed[1];
	}

	// Dynamic link
	const dynamicRegex = /dailymotion\.com(.*)video=([a-zA-Z\d]+)/gm;
	const dynamicParsed = dynamicRegex.exec(urlString);
	if (dynamicParsed && dynamicParsed.length > 2) {
		return dynamicParsed[2];
	}

	return undefined;
}
