// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@sveltejs/kit" />

import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [sveltekit()],
  test   : { include: ['src/**/*.{test,spec}.{js,ts}'] },
}

export default config
