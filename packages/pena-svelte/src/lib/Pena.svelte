<script lang="ts">
  import Pena from '@privyid/pena'
  import type { PenaOption, Payload } from '@privyid/pena'
  import { createEventDispatcher, onDestroy } from 'svelte'

  export let url: PenaOption['url']
  export let lang: PenaOption['lang'] = undefined
  export let signature: PenaOption['signature'] = undefined
  export let layout: PenaOption['layout'] = undefined
  export let privyId: PenaOption['privyId'] = undefined
  export let ratio: PenaOption['ratio'] = undefined

  let target: HTMLDivElement
  let cleanup: ReturnType<typeof Pena.openDoc>

  const emit = createEventDispatcher<{ afterAction: Payload }>()

  const onAfterAction = (payload: Payload) => {
    emit('afterAction', payload)
  }

  $: if (target) {
    if (cleanup)
      cleanup()

    cleanup = Pena.openDoc({
      container    : target,
      url          : url,
      lang         : lang,
      signature    : signature,
      layout       : layout,
      privyId      : privyId,
      ratio        : ratio,
      onAfterAction: onAfterAction,
    })
  }

  onDestroy(() => {
    if (cleanup)
      cleanup()
  })
</script>

<div class="pena__container" bind:this={target}></div>
