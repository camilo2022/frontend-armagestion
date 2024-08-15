import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableconfigurationCampaigsComponent } from './tableconfiguration-campaigs.component';

describe('TableconfigurationCampaigsComponent', () => {
  let component: TableconfigurationCampaigsComponent;
  let fixture: ComponentFixture<TableconfigurationCampaigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableconfigurationCampaigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableconfigurationCampaigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
