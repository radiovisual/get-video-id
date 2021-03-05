/**
 * Get the Microsoft Stream id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function microsoftStream(str) {
  const regex = (str.indexOf('embed') > -1)
    ? /https:\/\/web\.microsoftstream\.com\/embed\/video\/([a-zA-Z0-9-]*)\/?/
    : /https:\/\/web\.microsoftstream\.com\/video\/([a-zA-Z0-9-]*)\/?/;
  const matches = regex.exec(str);
  return matches && matches[1];
}
