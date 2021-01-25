import stripParameters from './utils/strip-parameters';

/**
 * Get the Youtube Video id.
 * @param {string} youtubeStr - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export default function youtube(youtubeStr) {
  let str = youtubeStr;

  // remove time hash at the end of the string
  str = str.replace(/#t=.*$/, '');

  // shortcode
  const shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;

  if (shortcode.test(str)) {
    const shortcodeid = str.split(shortcode)[1];
    return stripParameters(shortcodeid);
  }

  // /v/ or /vi/
  const inlinev = /\/v\/|\/vi\//g;

  if (inlinev.test(str)) {
    const inlineid = str.split(inlinev)[1];
    return stripParameters(inlineid);
  }

  // v= or vi=
  const parameterv = /v=|vi=/g;

  if (parameterv.test(str)) {
    const arr = str.split(parameterv);
    return stripParameters(arr[1].split('&')[0]);
  }

  // v= or vi=
  const parameterwebp = /\/an_webp\//g;

  if (parameterwebp.test(str)) {
    const webp = str.split(parameterwebp)[1];
    return stripParameters(webp);
  }

  // embed
  const embedreg = /\/embed\//g;

  if (embedreg.test(str)) {
    const embedid = str.split(embedreg)[1];
    return stripParameters(embedid);
  }

  // ignore /user/username pattern
  const usernamereg = /\/user\/([a-zA-Z0-9]*)$/g;

  if (usernamereg.test(str)) {
    return undefined;
  }

  // user
  const userreg = /\/user\/(?!.*videos)/g;

  if (userreg.test(str)) {
    const elements = str.split('/');
    return stripParameters(elements.pop());
  }

  // attribution_link
  const attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

  if (attrreg.test(str)) {
    return stripParameters(str.match(attrreg)[1]);
  }

  return undefined;
}
