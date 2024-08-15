import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablepaymentsComponent } from './tablepayments.component';

describe('TablepaymentsComponent', () => {
  let component: TablepaymentsComponent;
  let fixture: ComponentFixture<TablepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablepaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
