import getSrc from 'get-src';
import youtube from './youtube';
import vimeo from './vimeo';
import vine from './vine';
import videopress from './videopress';

/**
 * Get the id and service from a video url.
 * @param {String} str - the url from which you want to extract the id
 * @returns {Object}
 */
export default function getVideoId(str) {
    if (typeof str !== 'string') {
        throw new TypeError('get-video-id expects a string');
    }

    if (/<iframe/gi.test(str)) {
        str = getSrc(str);
    }

    // remove surrounding whitespaces or linefeeds
    str = str.trim();

    // remove the '-nocookie' flag from youtube urls
    str = str.replace('-nocookie', '');

    // remove any leading `www.`
    str = str.replace('/www.', '/');

    var metadata = {};

    // Try to handle google redirection uri
    if (/\/\/google/.test(str)) {
        // Find the redirection uri
        var matches = str.match(/url=([^&]+)&/);

        // Decode the found uri and replace current url string - continue with final link
        if (matches) {
            // JavaScript can get encoded URI
            str = decodeURIComponent(matches[1]);
        }
    }

    if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(str)) {
        metadata = {
            id: youtube(str),
            service: 'youtube'
        };
    } else if (/vimeo/.test(str)) {
        metadata = {
            id: vimeo(str),
            service: 'vimeo'
        };
    } else if (/vine/.test(str)) {
        metadata = {
            id: vine(str),
            service: 'vine'
        };
    } else if (/videopress/.test(str)) {
        metadata = {
            id: videopress(str),
            service: 'videopress'
        };
    }
    return metadata;
}
