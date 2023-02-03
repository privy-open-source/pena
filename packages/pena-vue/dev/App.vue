<script setup lang="ts">
import { ref } from 'vue'
import { Pena } from '../src'

const url       = new URL('dev/testpage.html', location.origin).href
const layoutFit = ref(false)

function onAfterAction (data: unknown) {
  // eslint-disable-next-line no-console
  console.log(data)
}
</script>

<template>
  <div :style="{ display: 'flex' }">
    <div :style="{ width: '50%' }">
      <Pena
        :url="url"
        :layout="layoutFit ? 'fit' : 'fixed'"
        @after-action="onAfterAction" />
    </div>
    <div :style="{ width: '50%' }">
      <button @click="layoutFit = !layoutFit">
        Change Layout
      </button>
    </div>
  </div>
</template>
