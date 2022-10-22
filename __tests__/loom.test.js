/* eslint max-len: 0 */
import fn from '../src/index.js';

/**
 *  Loom should be able to find these patterns:
 *
 *  Urls:
 *  https://www.loom.com/share/7c7ced4911904070a5627374ccd84e8c
 *  https://www.loom.com/share/5bbdeb480ba84e65b1b3de8c190e2003?source=embed&t=20
 * 	https://www.loom.com/embed/7c7ced4911904070a5627374ccd84e8c
 */
describe('Loom', () => {
	test('Loom basic link', () => {
		expect(fn('https://www.loom.com/share/7c7ced4911904070a5627374ccd84e8c').id).toBe('7c7ced4911904070a5627374ccd84e8c');
		expect(fn('https://www.loom.com/share/5bbdeb480ba84e65b1b3de8c190e2003?source=embed&t=20').id).toBe('5bbdeb480ba84e65b1b3de8c190e2003');
	});

	test('Loom embed', () => {
		expect(fn('<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/7c7ced4911904070a5627374ccd84e8c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>').id).toBe('7c7ced4911904070a5627374ccd84e8c');
	});

	test('returns undefined for unknown video ids', () => {
		const actual = fn('https://www.loom.com');
		expect(actual.id).toBe(undefined);
		expect(actual.service).toBe('loom');
	});
});

