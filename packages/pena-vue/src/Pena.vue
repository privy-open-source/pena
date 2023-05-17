<template>
  <div
    ref="container"
    class="pena__container" />
</template>

<script lang="ts">
import Pena from '@privyid/pena'
import type { Payload, PenaOption } from '@privyid/pena'
import type { PropType } from 'vue-demi'
import {
  watchEffect,
  defineComponent,
  ref,
} from 'vue-demi'

export default defineComponent({
  props: {
    url: {
      type    : String as PropType<PenaOption['url']>,
      required: true,
    },
    layout: {
      type   : String as PropType<PenaOption['layout']>,
      default: undefined,
    },
    lang: {
      type   : String as PropType<PenaOption['lang']>,
      default: undefined,
    },
    debug: {
      type   : Boolean as PropType<PenaOption['debug']>,
      default: undefined,
    },
    privyId: {
      type   : String as PropType<PenaOption['privyId']>,
      default: undefined,
    },
    visibility: {
      type   : Boolean as PropType<PenaOption['visibility']>,
      default: undefined,
    },
    signature: {
      type   : Object as PropType<PenaOption['signature']>,
      default: undefined,
    },
    ratio: {
      type   : Number as PropType<PenaOption['ratio']>,
      default: undefined,
    },
    needScrollTo: {
      type   : Number as PropType<PenaOption['needScrollTo']>,
      default: undefined,
    },
  },
  emits: ['after-action'],
  setup (props, { emit }) {
    const container = ref<HTMLDivElement>()

    function onAfterAction (payload: Payload) {
      emit('after-action', payload)
    }

    watchEffect((onCleanUp) => {
      if (container.value) {
        const cleanup = Pena.openDoc({
          container   : container.value,
          url         : props.url,
          layout      : props.layout,
          lang        : props.lang,
          debug       : props.debug,
          privyId     : props.privyId,
          visibility  : props.visibility,
          signature   : props.signature,
          ratio       : props.ratio,
          needScrollTo: props.needScrollTo,
          onAfterAction,
        })

        onCleanUp(cleanup)
      }
    })

    return { container }
  },
})
</script>
