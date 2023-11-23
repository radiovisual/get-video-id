import resolve from 'rollup-plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

const minified = file => file.replace(/.js/, '.min.js');

const banner = `/*! get-video-id v${pkg.version} | @license MIT © Michael Wuergler | https://github.com/radiovisual/get-video-id */`;

const config = {
	input: './src/index.js',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
			banner,
		},
		{
			file: minified(pkg.main),
			format: 'cjs',
			sourcemap: true,
			banner,
		},
		{
			file: pkg.module,
			format: 'esm',
			sourcemap: true,
			banner,
		},
		{
			file: minified(pkg.module),
			format: 'esm',
			sourcemap: true,
			banner,
		},
		{
			file: minified('dist/get-video-id.umd.js'),
			format: 'umd',
			sourcemap: true,
			name: 'getVideoId',
			banner,
		},
		{
			file: 'dist/get-video-id.umd.js',
			format: 'umd',
			sourcemap: true,
			name: 'getVideoId',
			banner,
		},
	],
	preserveModules: false,
	plugins: [
		cleaner({
			targets: ['dist'],
		}),
		resolve({
			mainFields: ['module', 'main'],
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			babelrc: false,
			presets: [
				[
					'@babel/preset-env',
					{
						modules: false,
					},
				],
			],
		}),
		terser({
			output: {
				comments: 'some',
			},
			include: [/^.+\.min\.js$/],
		}),
	],
};

export default config;
