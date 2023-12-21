import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DogSectionComponent } from './dog-section.component'

describe('DogSectionComponent', () => {
  let component: DogSectionComponent
  let fixture: ComponentFixture<DogSectionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogSectionComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(DogSectionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
