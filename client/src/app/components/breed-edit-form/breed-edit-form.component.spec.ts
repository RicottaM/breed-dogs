import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedEditFormComponent } from './breed-edit-form.component';

describe('BreedEditFormComponent', () => {
  let component: BreedEditFormComponent;
  let fixture: ComponentFixture<BreedEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreedEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
