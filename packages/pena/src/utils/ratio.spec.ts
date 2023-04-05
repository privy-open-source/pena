import { vi } from 'vitest'
import { calculateRatio } from '../__mocks__/calculate-ratio'
import { ResizeObserver, triggerChange } from '../__mocks__/resize-observer'
import { useRatio } from './ratio'

// eslint-disable-next-line @typescript-eslint/promise-function-async
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

vi.mock('./calculate-ratio.ts', () => {
  return { calculateRatio }
})

vi.stubGlobal('ResizeObserver', ResizeObserver)

afterEach(() => {
  vi.restoreAllMocks()
})

it('should able to calculate element ratio', async () => {
  const sample  = document.createElement('div')
  const cleanUp = useRatio(sample, 4 / 3)

  document.append(sample)

  await delay(0)

  expect(sample).toBeInTheDocument()
  expect(sample).toHaveAttribute('data-aspect-ratio', `${4 / 3}`)
  expect(sample).toHaveAttribute('data-aspect-fixed', 'false')
  expect(calculateRatio).lastCalledWith(sample, 4 / 3)

  await cleanUp()
})

it('should recalculate ratio if element size changed', async () => {
  const sample  = document.createElement('div')
  const cleanUp = useRatio(sample, 4 / 3)

  document.append(sample)

  await delay(0)

  expect(sample).toBeInTheDocument()
  expect(calculateRatio).toBeCalledTimes(1)

  triggerChange()

  await delay(0)

  expect(calculateRatio).toBeCalledTimes(2)

  await cleanUp()
})
