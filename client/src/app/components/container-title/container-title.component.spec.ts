import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTitleComponent } from './container-title.component';

describe('ContainerTitleComponent', () => {
  let component: ContainerTitleComponent;
  let fixture: ComponentFixture<ContainerTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
