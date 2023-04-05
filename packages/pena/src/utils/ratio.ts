import { calculateRatio } from './calculate-ratio'
import { getObserver } from './resize-observer'

export function useRatio (target: HTMLElement, ratio: number = 210 / 297) {
  async function init () {
    const observer = await getObserver()

    target.dataset.aspectRatio = `${ratio}`
    target.dataset.aspectFixed = 'false'

    calculateRatio(target, ratio)
    observer.observe(target)
  }

  async function destroy () {
    const observer = await getObserver()

    observer.unobserve(target)
  }

  init()

  return destroy
}
