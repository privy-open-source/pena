import { queryByTestId } from '@testing-library/dom'
import $ from 'jquery'
import '.'
import { vi } from 'vitest'

beforeAll(() => {
  document.body.innerHTML = `
    <div id="app"></div>
  `
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should extend jquery function', () => {
  expect(typeof $('#app').openDoc).toBe('function')
})

it('should create Pena instance', () => {
  $('#app').openDoc({ url: 'http://sign.document.com/123456' })

  const iframe = queryByTestId(document.body, 'pena-iframe')

  expect(iframe).toBeInTheDocument()
  expect(iframe).toHaveProperty('src', 'http://sign.document.com/123456')

  $('#app').closeDoc()

  expect(iframe).not.toBeInTheDocument()
})
