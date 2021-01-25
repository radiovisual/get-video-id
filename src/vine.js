/**
 * Get the vine id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function vine(str) {
  const regex = /https:\/\/vine\.co\/v\/([a-zA-Z0-9]*)\/?/;
  const matches = regex.exec(str);
  return matches && matches[1];
}
