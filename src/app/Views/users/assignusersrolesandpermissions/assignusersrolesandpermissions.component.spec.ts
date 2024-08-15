import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignusersrolesandpermissionsComponent } from './assignusersrolesandpermissions.component';

describe('AssignusersrolesandpermissionsComponent', () => {
  let component: AssignusersrolesandpermissionsComponent;
  let fixture: ComponentFixture<AssignusersrolesandpermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignusersrolesandpermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignusersrolesandpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
