/**
 * Get the tiktok id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function tiktok(str) {
  // Parse basic url and embeds
  const basicReg = /tiktok\.com(.*)\/video\/([0-9]+)/gm;
  const basicParsed = basicReg.exec(str);
  if (basicParsed) {
    return basicParsed[2];
  }

  return undefined;
}
