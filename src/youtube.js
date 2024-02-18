/**
 * Strip away any remaining parameters following `?` or `/` or '&' for YouTube shortcode strings.
 *
 * @note this function is not meant to work with url strings containing a protocol like https://
 * @param {String} shortcodeString - the parameter string
 * @returns {String}
 */
function stripParameters(shortcodeString) {
	// Split parameters or split folder separator
	if (shortcodeString.includes('?')) {
		shortcodeString = shortcodeString.split('?')[0];
	}

	if (shortcodeString.includes('/')) {
		shortcodeString = shortcodeString.split('/')[0];
	}

	if (shortcodeString.includes('&')) {
		shortcodeString = shortcodeString.split('&')[0];
	}

	return shortcodeString;
}

/**
 * Get the Youtube Video id.
 * @param {string} youtubeStr - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function youtube(youtubeString) {
	let string_ = youtubeString;

	// Remove the '-nocookie' flag from youtube urls
	string_ = string_.replace('-nocookie', '');

	// Remove time hash at the end of the string
	string_ = string_.replace(/#t=.*$/, '');

	// Strip the leading protocol
	string_ = string_.replace(/^https?:\/\//, '');

	// Shortcode
	const shortcode = /youtube:\/\/|youtu\.be\/|y2u\.be\//g;

	if (shortcode.test(string_)) {
		const shortcodeid = string_.split(shortcode)[1];
		return stripParameters(shortcodeid);
	}

	// Shorts
	const shortsUrl = /\/shorts\//g;
	if (shortsUrl.test(string_)) {
		return stripParameters(string_.split(shortsUrl)[1]);
	}

	// V= or vi=
	const parameterv = /v=|vi=/g;

	if (parameterv.test(string_)) {
		const array = string_.split(parameterv);
		return stripParameters(array[1].split('&')[0]);
	}

	// /v/ or /vi/ or /watch/
	const inlinev = /\/v\/|\/vi\/|\/watch\//g;

	if (inlinev.test(string_)) {
		const inlineid = string_.split(inlinev)[1];
		return stripParameters(inlineid);
	}

	// Format an_webp
	const parameterwebp = /\/an_webp\//g;

	if (parameterwebp.test(string_)) {
		const webp = string_.split(parameterwebp)[1];
		return stripParameters(webp);
	}

	// /e/
	const eformat = /\/e\//g;

	if (eformat.test(string_)) {
		const estring = string_.split(eformat)[1];
		return stripParameters(estring);
	}

	// Embed
	const embedreg = /\/embed\//g;

	if (embedreg.test(string_)) {
		const embedid = string_.split(embedreg)[1];
		return stripParameters(embedid);
	}

	// ignore /user/username pattern
	const usernamereg = /\/user\/([a-zA-Z\d]*)$/g;

	if (usernamereg.test(string_)) {
		return undefined;
	}

	// User
	const userreg = /\/user\/(?!.*videos)/g;

	if (userreg.test(string_)) {
		const elements = string_.split('/');
		return stripParameters(elements.pop());
	}

	// Attribution_link
	const attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

	if (attrreg.test(string_)) {
		return stripParameters(string_.match(attrreg)[1]);
	}

	// Live
	const livereg = /\/live\//g;

	if (livereg.test(string_)) {
		const liveid = string_.split(livereg)[1];
		return stripParameters(liveid);
	}

	return undefined;
}
