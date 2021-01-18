import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

const minified = file => file.replace(/.js/, '.min.js');

export default {
	input: 'index.js',

	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: 'getVideoId'
		},
		{
			file: minified(pkg.main),
			format: 'umd',
			name: 'getVideoId'
		},
		{
			file: pkg.module,
			format: 'es'
		},
		{
			file: minified(pkg.module),
			format: 'es'
		}
	],

	plugins: [
		resolve({
			mainFields: ['module', 'main', 'browser']
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			babelrc: false,
			presets: [
				[
					'@babel/preset-env',
					{
						modules: false
					}
				]
			]
		}),
		terser({
			include: [/^.+\.min\.js$/]
		})
	]
};
