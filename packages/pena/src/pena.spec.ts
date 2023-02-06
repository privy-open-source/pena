import { fireEvent, queryByTestId } from '@testing-library/dom'
import { vi } from 'vitest'
import * as Pena from './pena'
import type { Payload } from './types'

vi.mock('./utils/sticky.ts', () => ({ useSticky: vi.fn(() => vi.fn()) }))

describe('isHavePlacement', () => {
  it('should return true if value have property `x`, `y`, `page`', () => {
    const result = Pena.isHavePlacement({
      x   : 50,
      y   : 30,
      page: 1,
    })

    expect(result).toBe(true)
  })

  it('should return false if value is undefined', () => {
    const result = Pena.isHavePlacement()

    expect(result).toBe(false)
  })

  it('should return false if value is only have partial', () => {
    const result = Pena.isHavePlacement({
      x   : 50,
      page: 1,
    })

    expect(result).toBe(false)
  })
})

describe('createURL', () => {
  it('should able to set lang with option `lang`', () => {
    const url = Pena.createURL({
      url : 'http://sign.document.com/123456',
      lang: 'id',
    })

    expect(url.href).toBe('http://sign.document.com/123456?lang=id')
  })

  it('should able to set privyId with option `privyId`', () => {
    const url = Pena.createURL({
      url    : 'http://sign.document.com/123456',
      privyId: 'UAT001',
    })

    expect(url.href).toBe('http://sign.document.com/123456?privyId=UAT001')
  })

  it('should able to add placement signature with option `signature`', () => {
    const url = Pena.createURL({
      url      : 'http://sign.document.com/123456',
      signature: {
        x   : 50,
        y   : 100,
        page: 1,
      },
    })

    expect(url.href).toBe('http://sign.document.com/123456?x=50&y=100&page=1&fixed=false')
  })

  it('should able to disabled move with option `signature.fixed` set to true', () => {
    const url = Pena.createURL({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      signature: {
        x    : 50,
        y    : 100,
        page : 1,
        fixed: true,
      },
    })

    expect(url.href).toBe('http://sign.document.com/123456?x=50&y=100&page=1&fixed=true')
  })

  it('should able to enable debug mode with option `debug` set to true', () => {
    const url = Pena.createURL({
      url  : 'http://sign.document.com/123456',
      debug: true,
    })

    expect(url.href).toBe('http://sign.document.com/123456?debug=true')
  })

  it('should able to set invisible signature with `visibility` set to false', () => {
    const url = Pena.createURL({
      url       : 'http://sign.document.com/123456',
      visibility: false,
    })

    expect(url.href).toBe('http://sign.document.com/123456?visibility=false')
  })
})

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
        event  : 'sign',
        payload: { message: 'OK' },
      }),
    })

    fireEvent(window, event)

    expect(onAfterAction).toBeCalledWith({
      event  : 'sign',
      payload: { message: 'OK' },
    })

    container.remove()
    cleanUp()
  })

  it('should call onAfterAction if got an action (legacy)', () => {
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

    expect(onAfterAction).toBeCalledWith({
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

  it('should throw an error if url is invalid', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    expect(() => {
      Pena.openDoc({
        container: '#app',
        url      : '123456',
      })
    }).toThrowError('Invalid URL:')
  })
})
