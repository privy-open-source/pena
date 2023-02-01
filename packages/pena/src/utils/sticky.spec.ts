import { vi } from 'vitest'
import { useSticky } from './sticky'

const innerHeight = vi.spyOn(window, 'innerHeight', 'get')

afterEach(() => {
  vi.resetAllMocks()
})

it('should set element height to fit window height', () => {
  const container = document.createElement('div')
  const target    = document.createElement('div')

  container.append(target)
  document.body.append(container)

  innerHeight.mockReturnValue(1000)

  vi.spyOn(target.parentElement as HTMLElement, 'getBoundingClientRect')
    .mockReturnValue({
      top   : 300,
      y     : 300,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  vi.spyOn(target, 'getBoundingClientRect')
    .mockReturnValue({
      top   : 300,
      y     : 300,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  const unsticky = useSticky(target)

  expect(target).toBeInTheDocument()
  expect(target).toHaveStyle({ height: '700px' })

  unsticky()
  container.remove()
})

it('should stick to viewport if window scrolled to element offset', () => {
  const container = document.createElement('div')
  const target    = document.createElement('div')

  container.append(target)
  document.body.append(container)

  innerHeight.mockReturnValue(1000)

  vi.spyOn(target.parentElement as HTMLElement, 'getBoundingClientRect')
    .mockReturnValue({
      top   : -50,
      y     : -50,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  vi.spyOn(target, 'getBoundingClientRect')
    .mockReturnValue({
      top   : 0,
      y     : 0,
      x     : 0,
      left  : 0,
      width : 300,
      height: 300,
      bottom: 0,
      right : 0,
      toJSON: vi.fn(),
    })

  const unsticky = useSticky(target)

  expect(target).toBeInTheDocument()
  expect(target).toHaveStyle({
    position: 'fixed',
    top     : '0px',
    left    : '0px',
    width   : '300px',
    height  : '1000px',
  })

  unsticky()
  container.remove()
})
