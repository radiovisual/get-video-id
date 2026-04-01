import {readFile} from 'node:fs/promises';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

// Remove these 2-lines to import JSON once with { type: 'json' } has official support. https://github.com/eslint/eslint/discussions/15305
const fileUrl = new URL('package.json', import.meta.url);
const pkg = JSON.parse(await readFile(fileUrl, 'utf8'));

const minifiedExtension = file => file.replace(/(\.c?js)$/, '.min$1');

const outputOptions = {
	sourcemap: true,
	banner: `/*! get-video-id v${pkg.version} | @license MIT © Michael Wuergler | https://github.com/radiovisual/get-video-id */`,
};

const config = {
	input: './src/index.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			...outputOptions,
		},
		{
			file: minifiedExtension(pkg.main),
			format: 'cjs',
			plugins: [terser()],
			...outputOptions,
		},
		{
			file: pkg.module,
			format: 'esm',
			...outputOptions,
		},
		{
			file: minifiedExtension(pkg.module),
			format: 'esm',
			plugins: [terser()],
			...outputOptions,
		},
		{
			file: minifiedExtension('dist/get-video-id.umd.cjs'),
			format: 'umd',
			name: 'getVideoId',
			plugins: [terser()],
			...outputOptions,
		},
		{
			file: 'dist/get-video-id.umd.cjs',
			format: 'umd',
			name: 'getVideoId',
			...outputOptions,
		},
	],
	plugins: [
		nodeResolve(),
		commonjs(),
	],
};

export default config;
