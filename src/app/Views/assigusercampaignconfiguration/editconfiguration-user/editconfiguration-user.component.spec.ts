import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconfigurationUserComponent } from './editconfiguration-user.component';

describe('EditconfigurationUserComponent', () => {
  let component: EditconfigurationUserComponent;
  let fixture: ComponentFixture<EditconfigurationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditconfigurationUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditconfigurationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
