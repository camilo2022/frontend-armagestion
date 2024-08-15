import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcyclesComponent } from './editcycles.component';

describe('EditcyclesComponent', () => {
  let component: EditcyclesComponent;
  let fixture: ComponentFixture<EditcyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
