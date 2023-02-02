<div id="body">
  <h1>Test Page</h1>
  <button on:click={sendMessage}>
    Send
  </button>
</div>

<script lang="ts">
  function sendMessage () {
    window.parent.postMessage(JSON.stringify({
      event  : 'sign',
      payload: {
        message: 'OK',
      },
    }))
  }
</script>

<style>
  #body {
    background-color: #D61355;
    min-height: 100vh;
  }
</style>
