import youtube from './youtube.js';
import vimeo from './vimeo.js';
import vine from './vine.js';
import videopress from './videopress.js';
import microsoftStream from './microsoftstream.js';
import tiktok from './tiktok.js';
import dailymotion from './dailymotion.js';
import getSrc from './utils/get-src.js';

/**
 * Get the id and service from a video url.
 * @param {String} urlString - the url from which you want to extract the id
 * @returns {Object}
 */
function getVideoId(urlString) {
	if (typeof urlString !== 'string') {
		throw new TypeError('get-video-id expects a string');
	}

	let string_ = urlString;

	if (/<iframe/gi.test(string_)) {
		string_ = getSrc(string_) || '';
	}

	// Remove surrounding whitespaces or linefeeds
	string_ = string_.trim();

	// Remove the '-nocookie' flag from youtube urls
	string_ = string_.replace('-nocookie', '');

	// Remove any leading `www.`
	string_ = string_.replace('/www.', '/');

	let metadata = {
		id: null,
		service: null,
	};

	// Try to handle google redirection uri
	if (/\/\/google/.test(string_)) {
		// Find the redirection uri
		const matches = string_.match(/url=([^&]+)&/);

		// Decode the found uri and replace current url string - continue with final link
		if (matches) {
			// JavaScript can get encoded URI
			string_ = decodeURIComponent(matches[1]);
		}
	}

	if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(string_)) {
		metadata = {
			id: youtube(string_),
			service: 'youtube',
		};
	} else if (/vimeo/.test(string_)) {
		metadata = {
			id: vimeo(string_),
			service: 'vimeo',
		};
	} else if (/vine/.test(string_)) {
		metadata = {
			id: vine(string_),
			service: 'vine',
		};
	} else if (/videopress/.test(string_)) {
		metadata = {
			id: videopress(string_),
			service: 'videopress',
		};
	} else if (/microsoftstream/.test(string_)) {
		metadata = {
			id: microsoftStream(string_),
			service: 'microsoftstream',
		};
	} else if (/tiktok\.com/.test(string_)) {
		metadata = {
			id: tiktok(string_),
			service: 'tiktok',
		};
	} else if (/(dailymotion\.com|dai\.ly)/.test(string_)) {
		metadata = {
			id: dailymotion(string_),
			service: 'dailymotion',
		};
	}

	return metadata;
}

export default getVideoId;
