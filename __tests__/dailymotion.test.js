/* eslint max-len: 0 */
import fn from '../src/index.js';

/**
 *  Dailymotion should be able to find these patterns:
 *
 *  Urls:
 *  http://www.dailymotion.com/video/id_title_text
 *  http://www.dailymotion.com/video/id
 *  http://www.dailymotion.com/fr/relevance/search/search+query/1#video=id
 *  https://www.dailymotion.com/video/id?playlist=
 *  https://www.dailymotion.com/embed/video/id?autoplay=1
 *  http://dai.ly/id
 *
 *  Not supported (channel id only):
 *  http://www.dailymotion.com/hub/id_title
 */

describe('Dailymotion', () => {
	test('Dailymotion basic link/embed', () => {
		expect(fn('http://www.dailymotion.com/video/x44lvd_rates-of-exchange-like-a-renegade_music').id).toBe('x44lvd');
		expect(fn('http://www.dailymotion.com/video/x44lvd').id).toBe('x44lvd');
		expect(fn('http://www.dailymotion.com/video/xn1bi0_hakan-yukur-klip_sport').id).toBe('xn1bi0');
		expect(fn('https://www.dailymotion.com/video/x82nygx?playlist=x5nmbq').id).toBe('x82nygx');
		expect(fn('https://www.dailymotion.com/embed/video/x82nygx?autoplay=1').id).toBe('x82nygx');
		expect(fn('http://www.dailymotion.com/fr/relevance/search/gangnam+style/1#video=xsbwie').id).toBe('xsbwie');
	});

	test('Dailymotion returns the service', () => {
		expect(fn('http://www.dailymotion.com/video/1234').service).toBe('dailymotion');
	});

	test('Dailymotion short link', () => {
		expect(fn('http://dai.ly/x2no31b').id).toBe('x2no31b');
		expect(fn('http://dai.ly/x2no31b').service).toBe('dailymotion');
	});

	test('Dailymotion dynamic id', () => {
		expect(fn('http://www.dailymotion.com/fr/relevance/search/gangnam+style/1#video=xsbwie').id).toBe('xsbwie');
		expect(fn('http://www.dailymotion.com/hub/x9q_Galatasaray#video=xjw21s').id).toBe('xjw21s');
	});

	test('Dailymotion iframe', () => {
		const actual = fn('<iframe src="https://www.dailymotion.com/embed/video/12780" width="600" height="600"></iframe>');
		expect(actual.id).toBe('12780');
		expect(actual.service).toBe('dailymotion');
	});

	test('returns undefined for unknown video ids', () => {
		const actual = fn('http://www.dailymotion.com');
		expect(actual.id).toBe(undefined);
		expect(actual.service).toBe('dailymotion');
	});
});

