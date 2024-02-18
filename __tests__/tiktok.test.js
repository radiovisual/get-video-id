/* eslint max-len: 0 */
import fn from '../src/index.js';

/**
 *  TikTok should be able to find these patterns:
 *
 *  Urls:
 *  https://www.tiktok.com/@brickabrackcommunity/video/id
 *  https://www.tiktok.com/@brickabrackcommunity/video/id?
 *
 *  Not supported yet (requires a fetch):
 *  https://vm.tiktok.com/ZS9c8yNN/
 */
describe('TikTok', () => {
	test('Tiktok basic link/embed', () => {
		expect(fn('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085').id).toBe('6950630446614990085');
		expect(fn('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085?lang=fr&is_copy_url=1&is_from_webapp=v1').id).toBe('6950630446614990085');
		expect(fn('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085?sender_device=pc&sender_web_id=6930592755036374533&is_from_webapp=v1&is_copy_url=0').id).toBe('6950630446614990085');
	});

	test('returns undefined for unknown video ids', () => {
		const actual = fn('http://www.tiktok.com');
		expect(actual.id).toBeUndefined();
		expect(actual.service).toBe('tiktok');
	});
});

