import { fireEvent, queryByTestId } from '@testing-library/dom'
import { vi } from 'vitest'
import * as Pena from './pena'

describe('Positive Case', () => {
  it('should render iframe to target', () => {
    const container = document.createElement('div')

    document.body.append(container)

    const cleanUp = Pena.docSign({
      container: container,
      url      : 'http://sign.document.com/123456',
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

    const cleanUp = Pena.docSign({
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

    const cleanUp = Pena.docSign({
      url: 'http://sign.document.com/123456',
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toBeInTheDocument()

    container.remove()
    cleanUp()
  })

  it('should able to set lang with option `lang`', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const cleanUp = Pena.docSign({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      lang     : 'id',
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toHaveProperty('src', 'http://sign.document.com/123456?lang=id')

    container.remove()
    cleanUp()
  })

  it('should able to set privyId with option `privyId`', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const cleanUp = Pena.docSign({
      container : '#app',
      url    : 'http://sign.document.com/123456',
      privyId: 'UAT001'
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toHaveProperty('src', 'http://sign.document.com/123456?privyId=UAT001')

    container.remove()
    cleanUp()
  })

  it('should able to add placement signature with option `signature`', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const cleanUp = Pena.docSign({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      signature: {
        x   : 50,
        y   : 100,
        page: 1,
      }
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toHaveProperty('src', 'http://sign.document.com/123456?x=50&y=100&page=1&fixed=false')

    container.remove()
    cleanUp()
  })

  it('should able to disabled move with option `signature.fixed` set to true', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const cleanUp = Pena.docSign({
      container: '#app',
      url      : 'http://sign.document.com/123456',
      signature: {
        x    : 50,
        y    : 100,
        page : 1,
        fixed: true,
      }
    })

    const iframe = queryByTestId(container, 'pena-iframe')

    expect(iframe).toHaveProperty('src', 'http://sign.document.com/123456?x=50&y=100&page=1&fixed=true')

    container.remove()
    cleanUp()
  })

  it('should able call onAfterAction', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    const onAfterAction = vi.fn()
    const cleanUp       = Pena.docSign({
      container    : '#app',
      url          : 'http://sign.document.com/123456',
      onAfterAction: onAfterAction,
    })

    const event = Object.assign(new MessageEvent('message'), {
      origin: 'http://sign.document.com',
      data  : JSON.stringify({
        event  : 'sign',
        payload: {
          message: 'OK',
        },
      })
    })

    fireEvent(window, event)

    expect(onAfterAction).toBeCalledWith({
      event  : 'sign',
      payload: {
        message: 'OK',
      },
    })

    container.remove()
    cleanUp()
  })
})

describe('Negative Case', () => {
  it('should throw an error if target container not found', () => {
    expect(() => {
      Pena.docSign({
        url: 'http://sign.document.com/123456',
      })
    }).toThrowError('Cannot find target container')
  })

  it('should throw an error if url is invalid', () => {
    const container = document.createElement('div')

    container.setAttribute('id', 'app')
    document.body.append(container)

    expect(() => {
      Pena.docSign({
        container: '#app',
        url      : '123456',
      })
    }).toThrowError('Invalid URL:')
  })
})
