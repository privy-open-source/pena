import { defineBuildConfig } from 'unbuild'
import getTarget from 'browserslist-to-esbuild'

export default defineBuildConfig({
  entries    : ['src/'],
  declaration: true,
  rollup     : {
    emitCJS  : true,
    cjsBridge: true,
    esbuild  : { target: getTarget() },
  },
})
