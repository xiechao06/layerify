import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: 'build/index.cjs.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    babel()
  ]
};
