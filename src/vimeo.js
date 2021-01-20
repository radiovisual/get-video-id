/**
 * Get the vimeo id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function vimeo(str) {
	if (str.indexOf('#') > -1) {
		str = str.split('#')[0];
	}
	if (str.indexOf('?') > -1 && str.indexOf('clip_id=') === -1) {
		str = str.split('?')[0];
	}

	var id;
	var arr;

	var primary = /https?:\/\/vimeo\.com\/([0-9]+)/;

	var matches = primary.exec(str);
	if (matches && matches[1]) {
		return matches[1];
	}

	var vimeoPipe = [
		'https?:\/\/player\.vimeo\.com\/video\/[0-9]+$',
		'https?:\/\/vimeo\.com\/channels',
		'groups',
		'album'
	].join('|');

	var vimeoRegex = new RegExp(vimeoPipe, 'gim');

	if (vimeoRegex.test(str)) {
		arr = str.split('/');
		if (arr && arr.length) {
			id = arr.pop();
		}
	} else if (/clip_id=/gim.test(str)) {
		arr = str.split('clip_id=');
		if (arr && arr.length) {
			id = arr[1].split('&')[0];
		}
	}

	return id;
}
