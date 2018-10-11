import node from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { uglify } from 'rollup-plugin-uglify';

const pckg = require('./package');
const input = 'src/mapbox-gl-adapter.ts';

export default {
  external: ['mapbox-gl'],
  input,
  output: [
    { file: pckg.main, format: 'umd', name: 'MapboxglAdapter', sourcemap: true }
  ],
  watch: {
    include: 'src/**',
  },

  plugins: [
    // Allows the node builtins to be required/imported
    builtins(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    node(),
    // Resolve source maps to the original source
    sourcemaps(),
    // uglify()
  ],
}
