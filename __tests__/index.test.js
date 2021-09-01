/* eslint max-len: 0 */
import fn from '../dist/get-video-id.js';

test('expects a string', () => {
	expect(() => {
		fn({});
	}).toThrow(/get-video-id expects a string/);
});

test('returns null as id and service', () => {
	const notFound = fn('foo');
	expect(notFound.id).toBe(null);
	expect(notFound.service).toBe(null);
});

test('google link returns null as id and service if missing url parameter', () => {
	const url = 'https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwiz9P3Aw5DVAhUDZVAKHcegCi8QuAIINDAB&usg=AFQjCNG0kTPdL8nC6zCi2QoZ1KVeTXH-pw';
	expect(fn(url).id).toBe(null);
	expect(fn(url).service).toBe(null);
});

