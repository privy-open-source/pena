/**
 * Use sticky element
 * @param target Target element
 */
export function useSticky (target: HTMLElement) {
  function render () {
    const parent = target.parentElement as HTMLElement

    const {
      top,
      height,
    } = parent.getBoundingClientRect()

    const {
      top: targetTop,
      left,
      width,
    } = target.getBoundingClientRect()

    if (top >= 0) {
      target.style.setProperty('height', `${window.innerHeight - targetTop}px`)
      target.style.setProperty('width', '100%')

      parent.style.removeProperty('min-height')

      target.style.removeProperty('position')
      target.style.removeProperty('top')
      target.style.removeProperty('left')
    } else {
      parent.style.setProperty('min-height', `${height}px`)

      target.style.setProperty('position', 'fixed')
      target.style.setProperty('top', '0px')
      target.style.setProperty('left', `${left}px`)
      target.style.setProperty('width', `${width}px`)
      target.style.setProperty('height', `${window.innerHeight}px`)
    }
  }

  function init() {
    render()
  }

  function destroy () {
    window.addEventListener('scroll', render, { passive: true })
    window.addEventListener('resize', render, { passive: true })
  }

  // onMounted
  init()

  return destroy
}
