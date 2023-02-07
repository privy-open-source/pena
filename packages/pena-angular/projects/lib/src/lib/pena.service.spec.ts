import { TestBed } from '@angular/core/testing'

import { PenaService } from './pena.service'

describe('PenaService', () => {
  let service: PenaService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PenaService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
