/**
 * Get the VideoPress id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function videopress(str) {
  let idRegex;

  if (str.indexOf('embed') > -1) {
    idRegex = /embed\/(\w{8})/;
    return str.match(idRegex)[1];
  }

  idRegex = /\/v\/(\w{8})/;

  const match = str.match(idRegex);

  if (match && match.length > 0) {
    return str.match(idRegex)[1];
  }

  return undefined;
}
