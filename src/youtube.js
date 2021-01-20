import stripParameters from './utils/strip-parameters';

/**
 * Get the Youtube Video id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function youtube(str) {
	// remove time hash at the end of the string
	str = str.replace(/#t=.*$/, '');

	// shortcode
	var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;

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
		return stripParameters(arr[1].split('&')[0]);
	}

	// v= or vi=
	var parameterwebp = /\/an_webp\//g;

	if (parameterwebp.test(str)) {
		var webp = str.split(parameterwebp)[1];
		return stripParameters(webp);
	}

	// embed
	var embedreg = /\/embed\//g;

	if (embedreg.test(str)) {
		var embedid = str.split(embedreg)[1];
		return stripParameters(embedid);
	}

	// ignore /user/username pattern
	var usernamereg = /\/user\/([a-zA-Z0-9]*)$/g;

	if (usernamereg.test(str)) {
		return undefined;
	}

	// user
	var userreg = /\/user\/(?!.*videos)/g;

	if (userreg.test(str)) {
		var elements = str.split('/');
		return stripParameters(elements.pop());
	}

	// attribution_link
	var attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

	if (attrreg.test(str)) {
		return stripParameters(str.match(attrreg)[1]);
	}
}
