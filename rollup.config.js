import resolve from 'rollup-plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const minified = (file) => file.replace(/.js/, '.min.js');

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      name: 'getVideoId',
    },
    {
      file: minified(pkg.main),
      format: 'umd',
      sourcemap: true,
      name: 'getVideoId',
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: minified(pkg.module),
      format: 'esm',
      sourcemap: true,
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
      include: [/^.+\.min\.js$/],
    }),
  ],
};
