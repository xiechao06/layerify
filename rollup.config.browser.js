import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'index.js',
  output: {
    file: 'build/layerify.min.js',
    format: 'iife',
    name: 'layerify',
    sourcemap: true,
  },
  plugins: [
    babel(),
    uglify(),
  ]
};
