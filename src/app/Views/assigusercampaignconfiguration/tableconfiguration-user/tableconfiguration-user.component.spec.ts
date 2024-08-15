import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableconfigurationUserComponent } from './tableconfiguration-user.component';

describe('TableconfigurationUserComponent', () => {
  let component: TableconfigurationUserComponent;
  let fixture: ComponentFixture<TableconfigurationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableconfigurationUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableconfigurationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
