/**
 * Get the vimeo id.
 *
 * @param {String} vimeoString the url from which you want to extract the id
 * @returns {String|undefined}
 */
export default function vimeo(vimeoString) {
	let string_ = vimeoString;

	if (string_.includes('#')) {
		[string_] = string_.split('#');
	}

	if (string_.includes('?') && !string_.includes('clip_id=')) {
		[string_] = string_.split('?');
	}

	let id;
	let array;

	const event = /https?:\/\/vimeo\.com\/event\/(\d+)$/;

	const eventMatches = event.exec(string_);

	if (eventMatches && eventMatches[1]) {
		return eventMatches[1];
	}

	const primary = /https?:\/\/vimeo\.com\/(\d+)/;

	const matches = primary.exec(string_);
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

	if (vimeoRegex.test(string_)) {
		array = string_.split('/');
		if (array && array.length > 0) {
			id = array.pop();
		}
	} else if (/clip_id=/gim.test(string_)) {
		array = string_.split('clip_id=');
		if (array && array.length > 0) {
			[id] = array[1].split('&');
		}
	}

	return id;
}
