'use strict';

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('get-video-id expected a string');
	}

	if (/<iframe/ig.test(str)) {
		str = getSrcFromEmbedCode(str);
	}

	// remove the '-nocookie' flag from youtube urls
	str = str.replace('-nocookie', '');

	var id;

	if (/youtube|youtu\.be/.test(str)) {
		id = youtube(str);
	} else if (/vimeo/.test(str)) {
		id = vimeo(str);
	} else if (/vine/.test(str)) {
		id = vine(str);
	}
	return id;
};

/**
 * Get the vimeo id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function vimeo(str) {
	var id;
	if (/https?:\/\/vimeo\.com\/[0-9]+$|https?:\/\/player\.vimeo\.com\/video\/[0-9]+$/igm.test(str)) {
		var arr = str.split('/');
		if (arr && arr.length) {
			id = arr.pop();
		}
	}
	return id;
}

/**
 * Get the vine id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function vine(str) {
	var regex = /https:\/\/vine\.co\/v\/([a-zA-Z0-9]*)\/?/;
	var matches = regex.exec(str);
	return matches && matches[1];
}

/**
 * Get the Youtube Video id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function youtube(str) {
	// shortcode
	var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\//g;

	if (shortcode.test(str)) {
		var shortcodeid = str.split(shortcode)[1];
		return stripParameters(shortcodeid);
	}

	// /v/ or /vi/
	var inlinev = /\/v\/|\/vi\//g;

	if (inlinev.test(str)) {
		var inlineid = str.split(inlinev)[1];
		return stripParameters(inlineid);
	}

	// v= or vi=
	var parameterv = /v=|vi=/g;

	if (parameterv.test(str)) {
		var arr = str.split(parameterv);
		return arr[1].split('&')[0];
	}

	// embed
	var embedreg = /\/embed\//g;

	if (embedreg.test(str)) {
		var embedid = str.split(embedreg)[1];
		return stripParameters(embedid);
	}

	// user
	var userreg = /\/user\//g;

	if (userreg.test(str)) {
		var elements = str.split('/');
		return stripParameters(elements.pop());
	}
}

/**
 * Strip away any parameters following `?`
 * @param str
 * @returns {*}
 */
function stripParameters(str) {
	if (str.indexOf('?') > -1) {
		return str.split('?')[0];
	}
	return str;
}

/**
 * extract the `src` url from an embed string
 * @param embedCodeString
 * @returns {*}
 */
function getSrcFromEmbedCode(embedCodeString) {
	var re = /src="(.*?)"/gm;
	var url = re.exec(embedCodeString);

	if (url && url.length >= 2) {
		return url[1];
	}
}
