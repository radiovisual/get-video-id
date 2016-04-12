'use strict';

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('get-video-id expected a string');
	}

	if (/<iframe/ig.test(str)) {
		str = getSrcFromEmbedCode(str);
	}

	// remove the '-no-cookie' flag from youtube urls
	str = str.replace('-nocookie', '');

	var id;

	if (/youtube|youtu\.be/.test(str)) {
		id = youtube(str);
	} else if (/vimeo/.test(str)) {
		id = vimeo(str);
	}
	return id;
};

/**
 * Get the vimeo id.
 *
 * Looks for the following patterns:
 *
 * 	https://vimeo.com/*
 *  https://player.vimeo.com/video/*
 *
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
 *	Get the Youtube Video id.
 *
 *	Can extract the id (*) from the following formats:
 *
 *	// shortcode
 *	youtube://*
 *	https://youtu.be/*
 *	http://youtu.be/*
 *	http://youtu.be/*?
 *
 * 	// /v/ or /vi/
 *	http://www.youtube.com/v/*
 *	http://youtube.com/v/*?
 *	http://youtube.com/vi/*?
 *
 *	// v= or vi=
 *	http://www.youtube.com/ytscreeningroom?v=*
 *	https://www.youtube.com/watch?v=*
 *	http://www.youtube.com/watch?v=*?&
 *	http://youtube.com/?v=*
 *	http://youtube.com/?vi=*&
 *	http://youtube.com/watch?vi=*&
 *
 *	// embed
 *	https://www.youtube.com/embed/*
 *	www.youtube-nocookie.com/embed/*?
 *	http://www.youtube.com/embed/*?rel=0
 *
 *	// user
 *	http://www.youtube.com/user/username#p/u/1/*
 *	http://www.youtube.com/user/username#p/a/u/2/*
 *	http://www.youtube.com/user/username#p/u/1/*?
 *
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function youtube(str) {
	// shortcode
	var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\//g;

	if (shortcode.test(str)) {
		// split on shortcode format
		var shortcodeid = str.split(shortcode)[1];

		// now make sure there aren't any parameters
		return stripParameters(shortcodeid);
	}

	// /v/ or /vi/
	var inlinev = /\/v\/|\/vi\//g;
	if (inlinev.test(str)) {
		// split on inlinev format
		var inlineid = str.split(inlinev)[1];

		// now make sure there aren't any parameters
		return stripParameters(inlineid);
	}

	// v= or vi=
	var parameterv = /v=|vi=/g;
	if (parameterv.test(str)) {
		// split on `v=` or `vi=`
		var arr = str.split(parameterv);

		// make sure we don't get anything after the `v=` or `vi=`
		// for example: watch?v=123456&playnext_from=ABC123
		return arr[1].split('&')[0];
	}

	// embed
	var embedreg = /\/embed\//g;
	if (embedreg.test(str)) {
		// split on /embed/
		var embedid = str.split(embedreg)[1];

		// make sure we don't get anything after the /embed/*
		// for example: /embed/ABC123?rel=0
		return stripParameters(embedid);
	}

	// user
	var userreg = /\/user\//g;
	if (userreg.test(str)) {
		var elements = str.split('/');
		return stripParameters(elements.pop());
	}
}

function stripParameters(str) {
	if (str.indexOf('?') > -1) {
		return str.split('?')[0];
	}
	return str;
}

function getSrcFromEmbedCode(embedCodeString) {
	var re = /src="(.*?)"/gm;
	var url = re.exec(embedCodeString);

	if (url && url.length >= 2) {
		return url[1];
	}
}
