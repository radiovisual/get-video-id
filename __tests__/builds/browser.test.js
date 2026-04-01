/* istanbul ignore file */
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const page = await JSDOM.fromFile(path.resolve(__dirname, 'index.html'), {runScripts: 'dangerously', resources: 'usable'});

// Wait for external scripts to load and execute
await new Promise(resolve => {
	if (page.window.document.readyState === 'complete') {
		setTimeout(resolve, 100);
	} else {
		page.window.addEventListener('load', () => {
			setTimeout(resolve, 100);
		});
	}
});

const videoId = page.window.document.querySelector('#video-id').textContent;
assert.equal(videoId, '1234', `Expected "1234", got "${videoId}"`);
console.log('✓ browser build test passed');
