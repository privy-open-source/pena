import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src/' },
    {
      builder: 'mkdist',
      input  : './src/',
      format : 'cjs',
      ext    : 'js',
    },
  ],
  declaration: true,
  rollup     : { emitCJS: true, cjsBridge: true },
})
