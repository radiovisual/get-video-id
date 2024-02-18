/* eslint max-len: 0 */
import fn from '../src/index.js';

/**
 * Loom should be able to find these patterns:
 *
 * https://www.loom.com/share/*
 * https://www.loom.com/share/*?
 * https://www.loom.com/embed/*
 */
describe('Loom', () => {
	test('extracts loom video id in url without query parameters', () => {
		expect(fn('https://www.loom.com/share/1234').id).toBe('1234');
		expect(fn('https://loom.com/share/1234').id).toBe('1234');
	});

	test('extracts loom video ids without www.', () => {
		expect(fn('https://loom.com/share/1234').id).toBe('1234');
		expect(fn('https://loom.com/embed/1234').id).toBe('1234');
	});

	test('extracts loom video id in url with query parameters', () => {
		expect(fn('https://www.loom.com/share/1234?source=embed&t=20').id).toBe('1234');
		expect(fn('https://loom.com/share/1234?source=embed&t=20').id).toBe('1234');
		expect(fn('https://www.loom.com/share/1234?source=embed&t=20#foo').id).toBe('1234');
		expect(fn('https://loom.com/share/1234?source=embed&t=20#foo').id).toBe('1234');
	});

	test('extracts video id from loom embed codes', () => {
		expect(fn('https://www.loom.com/embed/1234?source=embed&t=20').id).toBe('1234');
		expect(fn('https://loom.com/embed/1234?source=embed&t=20').id).toBe('1234');
		expect(fn('https://www.loom.com/embed/1234?source=embed&t=20#foo').id).toBe('1234');
		expect(fn('https://loom.com/embed/1234?source=embed&t=20#foo').id).toBe('1234');
		expect(fn('<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/12345" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>').id).toBe('12345');
		expect(fn('<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://loom.com/embed/12345" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>').id).toBe('12345');
		expect(fn('<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/123456?source=embed&t=20#foo" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>').id).toBe('123456');
		expect(fn('<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://loom.com/embed/123456?source=embed&t=20#foo" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>').id).toBe('123456');
	});

	test('returns undefined for unknown video ids', () => {
		const actual = fn('https://www.loom.com');
		expect(actual.id).toBeUndefined();
		expect(actual.service).toBe('loom');
	});
});
