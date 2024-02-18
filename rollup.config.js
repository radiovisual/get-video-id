import {readFile} from 'node:fs/promises';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

// Remove these 2-lines to import JSON once with { type: 'json' } has official support. https://github.com/eslint/eslint/discussions/15305
const fileUrl = new URL('package.json', import.meta.url);
const pkg = JSON.parse(await readFile(fileUrl, 'utf8'));

const minifiedExtension = file => file.replace(/.js/, '.min.js');

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(
	/^\D*/,
	'',
);

/**
 * Used for generating external dependencies
 * See: https://github.com/rollup/rollup-plugin-babel/issues/148#issuecomment-399696316
 */
const makeExternalPredicate = externalArray => {
	if (externalArray.length === 0) {
		return () => false;
	}

	const pattern = new RegExp(`^(${externalArray.join('|')})($|/)`);

	return id => pattern.test(id);
};

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
			file: minifiedExtension('dist/get-video-id.umd.js'),
			format: 'umd',
			name: 'getVideoId',
			plugins: [terser()],
			...outputOptions,
		},
		{
			file: 'dist/get-video-id.umd.js',
			format: 'umd',
			name: 'getVideoId',
			...outputOptions,
		},
	],
	external: makeExternalPredicate([
		// Handles both dependencies and peer dependencies so we don't have to manually maintain a list
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	]),
	plugins: [
		nodeResolve(),
		commonjs(),
		babel({
			babelHelpers: 'runtime',
			exclude: /node_modules/,
			plugins: [
				['@babel/plugin-transform-runtime', {version: babelRuntimeVersion}],
			],
			presets: [['@babel/preset-env', {targets: 'defaults'}]],
		}),
	],
};

export default config;
