import { createURL, isHavePlacement } from './url'

describe('isHavePlacement', () => {
  it('should return true if value have property `x`, `y`, `page`', () => {
    const result = isHavePlacement({
      x   : 50,
      y   : 30,
      page: 1,
    })

    expect(result).toBe(true)
  })

  it('should return false if value is undefined', () => {
    const result = isHavePlacement()

    expect(result).toBe(false)
  })

  it('should return false if value is only have partial', () => {
    const result = isHavePlacement({
      x   : 50,
      page: 1,
    })

    expect(result).toBe(false)
  })
})

describe('createURL', () => {
  it('should able to set lang with option `lang`', () => {
    const url = createURL({
      url : 'http://sign.document.com/123456',
      lang: 'id',
    })

    expect(url.href).toBe('http://sign.document.com/123456?lang=id')
  })

  it('should able to set privyId with option `privyId`', () => {
    const url = createURL({
      url    : 'http://sign.document.com/123456',
      privyId: 'UAT001',
    })

    expect(url.href).toBe('http://sign.document.com/123456?privyId=UAT001')
  })

  it('should able to add placement signature with option `signature`', () => {
    const url = createURL({
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
    const url = createURL({
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
    const url = createURL({
      url  : 'http://sign.document.com/123456',
      debug: true,
    })

    expect(url.href).toBe('http://sign.document.com/123456?debug=true')
  })

  it('should able to set user to scroll to spesific page using `needScrollTo`', () => {
    const url = createURL({
      url         : 'http://sign.document.com/123456',
      needScrollTo: 5,
    })

    expect(url.href).toBe('http://sign.document.com/123456?need_scrollto=5')
  })

  it('should able to set user to scroll to last page using `needScrollTo` set to `last`', () => {
    const url = createURL({
      url         : 'http://sign.document.com/123456',
      needScrollTo: 'last',
    })

    expect(url.href).toBe('http://sign.document.com/123456?need_scrollto=last')
  })

  it('should able to set invisible signature with `visibility` set to false', () => {
    const url = createURL({
      url       : 'http://sign.document.com/123456',
      visibility: false,
    })

    expect(url.href).toBe('http://sign.document.com/123456?visibility=false')
  })

  it('should throw an error if url is invalid', () => {
    expect(() => {
      createURL({ url: '123456' })
    }).toThrowError('Invalid URL:')
  })
})
