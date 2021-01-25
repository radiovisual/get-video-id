/**
 * Strip away any parameters following `?` or `/` or '&'
 * @param str
 * @returns {String}
 */
export default function stripParameters(str) {
  // Split parameters or split folder separator
  if (str.indexOf('?') > -1) {
    return str.split('?')[0];
  } if (str.indexOf('/') > -1) {
    return str.split('/')[0];
  } if (str.indexOf('&') > -1) {
    return str.split('&')[0];
  }
  return str;
}
