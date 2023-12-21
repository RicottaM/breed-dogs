import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailsComponent } from './breed-details.component';

describe('BreedDetailsComponent', () => {
  let component: BreedDetailsComponent;
  let fixture: ComponentFixture<BreedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
