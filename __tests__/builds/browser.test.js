/* istanbul ignore file */
import path from 'path';
import {expect} from '@jest/globals';
import {JSDOM} from 'jsdom';

describe('browser build', () => {
	test('getVideoId works in the browser', async () => {
		const page = await JSDOM.fromFile(path.resolve(__dirname, 'index.html'), {runScripts: 'dangerously', resources: 'usable'});
		// Pause for a moment and let the JavaScript in the HTML file fire
		await new Promise(resolve => setTimeout(() => resolve(), 100));
		expect(page.window.document.getElementById('video-id').innerText).toBe('1234');
	});
});
