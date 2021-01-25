/**
 * Get the vimeo id.
 * @param {string} vimeoStr - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function vimeo(vimeoStr) {
  let str = vimeoStr;

  if (str.indexOf('#') > -1) {
    [str] = str.split('#');
  }

  if (str.indexOf('?') > -1 && str.indexOf('clip_id=') === -1) {
    [str] = str.split('?');
  }

  let id;
  let arr;

  const primary = /https?:\/\/vimeo\.com\/([0-9]+)/;

  const matches = primary.exec(str);
  if (matches && matches[1]) {
    return matches[1];
  }

  const vimeoPipe = [
    'https?://player.vimeo.com/video/[0-9]+$',
    'https?://vimeo.com/channels',
    'groups',
    'album',
  ].join('|');

  const vimeoRegex = new RegExp(vimeoPipe, 'gim');

  if (vimeoRegex.test(str)) {
    arr = str.split('/');
    if (arr && arr.length) {
      id = arr.pop();
    }
  } else if (/clip_id=/gim.test(str)) {
    arr = str.split('clip_id=');
    if (arr && arr.length) {
      [id] = arr[1].split('&');
    }
  }

  return id;
}
