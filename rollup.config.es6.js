import babel from 'rollup-plugin-babel';
export default {
  input: 'index.js',
  output: {
    file: 'build/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    babel()
  ]
};
