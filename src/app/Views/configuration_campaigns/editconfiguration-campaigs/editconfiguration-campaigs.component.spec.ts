import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconfigurationCampaigsComponent } from './editconfiguration-campaigs.component';

describe('EditconfigurationCampaigsComponent', () => {
  let component: EditconfigurationCampaigsComponent;
  let fixture: ComponentFixture<EditconfigurationCampaigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditconfigurationCampaigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditconfigurationCampaigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
