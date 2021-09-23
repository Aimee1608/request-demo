import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import pluginCommonJs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'XesLogger',
        globals: {
          wx: 'wx',
          window: 'window',
          my: 'my',
          swan: 'swan',
          qq: 'qq',
          tt: 'tt'
        }
        // strict: false
      }],
    plugins: [
      resolve(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**'
      }),
      pluginCommonJs({
        include: 'node_modules/**',
        sourceMap: false
      })
      // uglify()
    ]
  }
];
