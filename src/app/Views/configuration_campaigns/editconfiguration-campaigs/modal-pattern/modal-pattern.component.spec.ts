import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPatternComponent } from './modal-pattern.component';

describe('ModalPatternComponent', () => {
  let component: ModalPatternComponent;
  let fixture: ComponentFixture<ModalPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPatternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
