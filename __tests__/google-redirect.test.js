/* eslint max-len: 0 */
import fn from '../src/index.js';

/**
*  Google redirect patterns:
*  https://google.cz/url?source=web&url=
*  https://google.com/image?url=
*/
describe('Google Redirects', () => {
	test('handles google redirection to youtube', () => {
		const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DeG1uDU0rSLw&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA';
		expect(fn(url).id).toBe('eG1uDU0rSLw');
		expect(fn(url).service).toBe('youtube');
	});

	test('handles google redirection to dailymotion', () => {
		const url = `https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=${encodeURIComponent('http://dai.ly/x2no31b')}&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA`;
		expect(fn(url).id).toBe('x2no31b');
		expect(fn(url).service).toBe('dailymotion');
	});

	test('handles google redirection to tiktok', () => {
		const url = `https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=${encodeURIComponent('https://www.tiktok.com/@brickabrackcommunity/video/6950630446614990085')}&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA`;
		expect(fn(url).id).toBe('6950630446614990085');
		expect(fn(url).service).toBe('tiktok');
	});

	test('handles google redirection to videopress', () => {
		const url = `https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=${encodeURIComponent('https://videopress.com/v/dyrgndFq')}&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA`;
		expect(fn(url).id).toBe('dyrgndFq');
		expect(fn(url).service).toBe('videopress');
	});

	test('handles google redirection to vine', () => {
		const url = `https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=${encodeURIComponent('https://vine.co/v/e5vIvmV5v9J')}&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA`;
		expect(fn(url).id).toBe('e5vIvmV5v9J');
		expect(fn(url).service).toBe('vine');
	});

	test('handles google redirection to microsoft stream', () => {
		const url = `https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwj30L2MvpDVAhUFZVAKHb8CBaYQuAIIIjAA&url=${encodeURIComponent('https://web.microsoftstream.com/video/73043e0c-cba8-482a-8a8e-0b72bc580ff0')}&usg=AFQjCNECyDn3DQL7U6VW2CnXQQjB0gNKqA`;
		expect(fn(url).id).toBe('73043e0c-cba8-482a-8a8e-0b72bc580ff0');
		expect(fn(url).service).toBe('microsoftstream');
	});

	test('google link returns undefined as id and service if missing url parameter', () => {
		const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw';
		expect(fn(url).id).toBeUndefined();
		expect(fn(url).service).toBeUndefined();
	});
});
