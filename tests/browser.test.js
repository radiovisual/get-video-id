import fs from 'fs';
import test from 'ava';
import { JSDOM } from 'jsdom';
import fn from '../dist/get-video-id';

test('works in a browser', async (t) => {
  t.plan(2);

  const copyTestHtml = () => fs.copyFileSync('test.html', '../dist/test.html');
  const deleteTestHtml = () => fs.unlinkSync('../dist/test.html');

  copyTestHtml();

  const options = {
    resources: 'usable',
    runScripts: 'dangerously',
  };

  const dom = await JSDOM.fromFile('../dist/test.html', options);
  const expectedId = '123450987';

  return new Promise((resolve, reject) => {
    const retry = setInterval(() => {
      if (!dom.window.getVideoId) {
        return;
      }

      t.is(typeof dom.window.getVideoId, 'function');
      t.is(fn(`https://player.vimeo.com/video/${expectedId}`).id, expectedId);
      clearInterval(retry);
      deleteTestHtml();
      resolve();
    }, 100);

    setTimeout(() => {
      clearInterval(retry);
      t.fail();
      deleteTestHtml();
      reject();
    }, 5000);
  });
});
