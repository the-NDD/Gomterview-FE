const babel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const dts = require('rollup-plugin-dts').default;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './dist/bundle.js',
        format: 'cjs',
      },
      {
        file: './dist/bundle.mjs',
        format: 'es',
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      commonjs(),
      babel({ extensions, babelHelpers: 'bundled' }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'types/index.d.ts',
    output: {
      file: './dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
