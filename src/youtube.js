/**
 * Strip away any remaining parameters following `?` or `/` or '&' for YouTube shortcode urls.
 *
 * @param {String} string_ - the parameter string (that does not contain a protocol like https://)
 * @returns {String}
 */
function stripParameters(string_) {
	// Split parameters or split folder separator
	if (string_.includes('?')) {
		return string_.split('?')[0];
	}

	if (string_.includes('/')) {
		return string_.split('/')[0];
	}

	if (string_.includes('&')) {
		return string_.split('&')[0];
	}

	return string_;
}

/**
 * Get the Youtube Video id.
 * @param {string} youtubeStr - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function youtube(youtubeString) {
	let string_ = youtubeString;

	// Remove time hash at the end of the string
	string_ = string_.replace(/#t=.*$/, '');

	// Shortcode
	const shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;

	if (shortcode.test(string_)) {
		const shortcodeid = string_.split(shortcode)[1];
		return stripParameters(shortcodeid);
	}

	// /v/ or /vi/
	const inlinev = /\/v\/|\/vi\//g;

	if (inlinev.test(string_)) {
		const inlineid = string_.split(inlinev)[1];
		return stripParameters(inlineid);
	}

	// V= or vi=
	const parameterv = /v=|vi=/g;

	if (parameterv.test(string_)) {
		const array = string_.split(parameterv);
		return stripParameters(array[1].split('&')[0]);
	}

	// V= or vi=
	const parameterwebp = /\/an_webp\//g;

	if (parameterwebp.test(string_)) {
		const webp = string_.split(parameterwebp)[1];
		return stripParameters(webp);
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

	return undefined;
}
