import youtube from './youtube.js';
import vimeo from './vimeo.js';
import vine from './vine.js';
import videopress from './videopress.js';
import microsoftStream from './microsoftstream.js';
import tiktok from './tiktok.js';
import dailymotion from './dailymotion.js';
import loom from './loom.js';
import sanitizeUrl from './utils/sanitize-url.js';
import extractGoogleRedirectionUrl from './utils/extract-google-redirection-url.js';

/**
 * Get the id and service from a video url.
 * @param {String} urlString - the url from which you want to extract the id
 * @returns {Object}
 */
function getVideoId(urlString) {
	if (typeof urlString !== 'string') {
		throw new TypeError('get-video-id expects a string');
	}

	const string_ = sanitizeUrl(urlString);
	const url = extractGoogleRedirectionUrl(string_);

	let metadata = {
		id: undefined,
		service: undefined,
	};

	if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(url)) {
		metadata = {
			id: youtube(url),
			service: 'youtube',
		};
	} else if (/vimeo/.test(url)) {
		metadata = {
			id: vimeo(url),
			service: 'vimeo',
		};
	} else if (/vine/.test(url)) {
		metadata = {
			id: vine(url),
			service: 'vine',
		};
	} else if (/videopress/.test(url)) {
		metadata = {
			id: videopress(url),
			service: 'videopress',
		};
	} else if (/microsoftstream/.test(url)) {
		metadata = {
			id: microsoftStream(url),
			service: 'microsoftstream',
		};
	} else if (/tiktok\.com/.test(url)) {
		metadata = {
			id: tiktok(url),
			service: 'tiktok',
		};
	} else if (/(dailymotion\.com|dai\.ly)/.test(url)) {
		metadata = {
			id: dailymotion(url),
			service: 'dailymotion',
		};
	} else if (/loom\.com/.test(url)) {
		metadata = {
			id: loom(url),
			service: 'loom',
		};
	}

	return metadata;
}

export default getVideoId;
