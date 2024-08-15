import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecyclesComponent } from './tablecycles.component';

describe('TablecyclesComponent', () => {
  let component: TablecyclesComponent;
  let fixture: ComponentFixture<TablecyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablecyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
