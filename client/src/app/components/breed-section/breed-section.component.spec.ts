import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedSectionComponent } from './breed-section.component';

describe('breedSectionComponent', () => {
  let component: BreedSectionComponent;
  let fixture: ComponentFixture<BreedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
