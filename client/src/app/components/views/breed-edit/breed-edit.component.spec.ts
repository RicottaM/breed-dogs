import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedEditComponent } from './breed-edit.component';

describe('BreedEditComponent', () => {
  let component: BreedEditComponent;
  let fixture: ComponentFixture<BreedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
