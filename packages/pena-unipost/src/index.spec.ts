import { vi } from 'vitest'
import unipost from '.'

afterEach(() => {
  delete window.PenaAndroid
  delete window.PenaFlutter
  delete window.PenaUnipost
  delete window.ReactNativeWebView

  vi.resetAllMocks()
})

it('should call postMessage', () => {
  const postMessage = vi.spyOn(window, 'postMessage')

  unipost('Hello')

  expect(postMessage).toBeCalledWith('Hello', '*')
})

it('should call PenaAndroid postMessage if exist', () => {
  const parentPostMessage = vi.fn()
  const postMessage       = vi.spyOn(window, 'postMessage')

  window.PenaAndroid = { postMessage: parentPostMessage }

  unipost('Hello')

  expect(postMessage).not.toBeCalled()
  expect(parentPostMessage).toBeCalledWith('Hello')
})

it('should call PenaAndroid postMessage if exist', () => {
  const parentPostMessage = vi.fn()
  const postMessage       = vi.spyOn(window, 'postMessage')

  window.PenaUnipost = { postMessage: parentPostMessage }

  unipost('Hello')

  expect(postMessage).not.toBeCalled()
  expect(parentPostMessage).toBeCalledWith('Hello')
})

it('should call PenaFlutter postMessage if exist', () => {
  const parentPostMessage = vi.fn()
  const postMessage       = vi.spyOn(window, 'postMessage')

  window.PenaFlutter = { postMessage: parentPostMessage }

  unipost('Hello')

  expect(postMessage).not.toBeCalled()
  expect(parentPostMessage).toBeCalledWith('Hello')
})

it('should call ReactNativeWebView postMessage if exist', () => {
  const parentPostMessage = vi.fn()
  const postMessage       = vi.spyOn(window, 'postMessage')

  window.ReactNativeWebView = { postMessage: parentPostMessage }

  unipost('Hello')

  expect(postMessage).not.toBeCalled()
  expect(parentPostMessage).toBeCalledWith('Hello')
})
