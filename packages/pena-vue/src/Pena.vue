<script lang="ts">
import {
  FunctionalComponent,
  h,
  ref,
  watchEffect,
} from 'vue'
import Pena, { PenaOption } from '@privyid/pena'

const PenaVue: FunctionalComponent<Omit<PenaOption, 'container'>> = (props) => {
  const target = ref<HTMLDivElement>()

  watchEffect((onCleanUp) => {
    if (target.value) {
      const cleanup = Pena.openDoc({
        container    : target.value,
        url          : props.url,
        lang         : props.lang,
        signature    : props.signature,
        layout       : props.layout,
        privyId      : props.privyId,
        onAfterAction: props.onAfterAction,
      })

      onCleanUp(cleanup)
    }
  })

  return h('div', { ref: target, class: ['pena__container'] })
}

PenaVue.emits = ['after-sign']

export default PenaVue
</script>
