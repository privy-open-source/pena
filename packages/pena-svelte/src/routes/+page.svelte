<script lang="ts">
  import type { Payload } from '@privyid/pena'
  import { page } from '$app/stores'
  import Pena from '../lib'

  const url = new URL('./testpage', $page.url).href

  let log       = [] as Payload[]
  let layoutFit = false

  function onAfterAction (data: CustomEvent<Payload>) {
    log = [...log, data.detail]
  }
</script>

<div class="row">
  <div class="col">
    <h1>Hello World</h1>
    <Pena
      url={url}
      layout={layoutFit ? 'fit' : 'fixed'}
      on:afterAction={onAfterAction}>
    </Pena>
  </div>
  <div class="col">
    <button on:click={() => layoutFit = !layoutFit}>
      Change Layout
    </button>
    <ul>
      {#each log as l}
        <li>{l.action} - {JSON.stringify(l.data)}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .row {
    display: flex;
  }

  .col {
    width: 50%;
  }
</style>
