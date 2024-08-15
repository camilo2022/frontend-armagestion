import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablefocusComponent } from './tablefocus.component';

describe('TablefocusComponent', () => {
  let component: TablefocusComponent;
  let fixture: ComponentFixture<TablefocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablefocusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablefocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
