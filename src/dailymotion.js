/**
 * Get the dailymotion id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function dailymotion(str) {
  // Parse basic url and embeds
  const basicReg = /dailymotion\.com(.*)(video)\/([a-zA-Z0-9]+)/gm;
  const basicParsed = basicReg.exec(str);
  if (basicParsed) {
    return basicParsed[3];
  }

  // Parse shortlink
  const shortRegex = /dai\.ly\/([a-zA-Z0-9]+)/gm;
  const shortParsed = shortRegex.exec(str);
  if (shortParsed) {
    return shortParsed[1];
  }

  // Dynamic link
  const dynamicRegex = /dailymotion\.com(.*)video=([a-zA-Z0-9]+)/gm;
  const dynamicParsed = dynamicRegex.exec(str);
  if (dynamicParsed) {
    return dynamicParsed[2];
  }

  return undefined;
}
