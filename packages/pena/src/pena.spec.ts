import { fireEvent, queryByTestId } from '@testing-library/dom'
import { vi } from 'vitest'
import * as Pena from './pena'
import type { Payload } from './types'

vi.mock('./utils/sticky.ts', () => ({ useSticky: vi.fn(() => vi.fn()) }))

describe('openDoc', () => {
  it('should render iframe to target', () => {
    const container = document.createElement('div')

    document.body.append(container)

    const cleanUp = Pena.openDoc({
      container,
      url: 'http://sign.document.com/123456',
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toBeInTheDocument()

    container.remove()
    cleanUp()
  })

  it('should able to use query selector as target', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const cleanUp = Pena.openDoc({
      container: '#app',
      url      : 'http://sign.document.com/123456',
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toBeInTheDocument()

    container.remove()
    cleanUp()
  })

  it('should search `.pena` if target not set', () => {
    const container = document.createElement('div')

    container.setAttribute('class', 'pena')
    document.body.append(container)

    const cleanUp = Pena.openDoc({ url: 'http://sign.document.com/123456' })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toBeInTheDocument()

    container.remove()
    cleanUp()
  })

  it('should call onAfterAction if got an action', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const onAfterAction = vi.fn()
    const cleanUp       = Pena.openDoc({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      onAfterAction,
    })

    const event = Object.assign(new MessageEvent('message'), {
      origin: 'http://sign.document.com',
      data  : JSON.stringify({
        action: 'sign',
        data  : { message: 'OK' },
      }),
    })

    fireEvent(window, event)

    expect(onAfterAction).toBeCalledWith({
      action: 'sign',
      data  : { message: 'OK' },
    })

    container.remove()
    cleanUp()
  })

  it('should not call onAfterAction if got an legacy action', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const onAfterAction = vi.fn()
    const cleanUp       = Pena.openDoc({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      onAfterAction,
    })

    const payload = { action: 'sign', data: { message: 'OK' } }
    const event   = Object.assign(new MessageEvent('message'), {
      origin: 'http://sign.document.com',
      data  : { event: 'after-sign', data: payload },
    })

    fireEvent(window, event)

    expect(onAfterAction).not.toBeCalledWith({
      action: 'sign',
      data  : { message: 'OK' },
    })

    container.remove()
    cleanUp()
  })

  it('should not call onAfterAction if got an action from another', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const onAfterAction = vi.fn()
    const cleanUp       = Pena.openDoc({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      onAfterAction,
    })

    const event = Object.assign(new MessageEvent<Payload>('message'), {
      origin: 'http://sign.document.com',
      data  : 'Hello World',
    })

    fireEvent(window, event)

    expect(onAfterAction).not.toBeCalled()

    container.remove()
    cleanUp()
  })

  it('should use sticky layout if option layout set to `fit`', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const cleanUp = Pena.openDoc({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      layout   : 'fit',
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toHaveAttribute('data-layout', 'fit')

    container.remove()
    cleanUp()
  })

  it('should throw an error if target container not found', () => {
    expect(() => {
      Pena.openDoc({ url: 'http://sign.document.com/123456' })
    }).toThrowError('Cannot find target container')
  })
})
