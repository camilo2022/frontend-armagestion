import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfocusComponent } from './editfocus.component';

describe('EditfocusComponent', () => {
  let component: EditfocusComponent;
  let fixture: ComponentFixture<EditfocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfocusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
