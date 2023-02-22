import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries    : ['src/'],
  declaration: true,
  rollup     : { emitCJS: true, cjsBridge: true },
})
