<script lang="ts">
  import Pena from '@privyid/pena'
  import { createEventDispatcher, onDestroy } from 'svelte'

  export let url: Pena.PenaOption['url']
  export let lang: Pena.PenaOption['lang'] = undefined
  export let signature: Pena.PenaOption['signature'] = undefined
  export let layout: Pena.PenaOption['layout'] = undefined
  export let privyId: Pena.PenaOption['privyId'] = undefined

  let target: HTMLDivElement
  let cleanup: ReturnType<typeof Pena.docSign>

  const emit = createEventDispatcher<{ afterAction: Pena.Payload }>()

  const onAfterAction: Pena.PenaOption['onAfterAction'] = (payload) => {
    emit('afterAction', payload)
  }

  $: if (target) {
    if (cleanup)
      cleanup()

    cleanup = Pena.docSign({
      container    : target,
      url          : url,
      lang         : lang,
      signature    : signature,
      layout       : layout,
      privyId      : privyId,
      onAfterAction: onAfterAction,
    })
  }

  onDestroy(() => {
    if (cleanup)
      cleanup()
  })
</script>

<div class="pena__container" bind:this={target}></div>
