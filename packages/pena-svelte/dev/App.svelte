<script lang="ts">
  import Pena from '../src'

  const url = new URL('./dev/testpage.html', location.origin).href

  let layoutFit = false

  function onAfterAction (data: CustomEvent) {
    console.log(data.detail)
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
