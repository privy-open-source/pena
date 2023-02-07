import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { PenaComponent } from './pena.component'

describe('PenaComponent', () => {
  let component: PenaComponent
  let fixture: ComponentFixture<PenaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [PenaComponent] })
      .compileComponents()

    fixture   = TestBed.createComponent(PenaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
