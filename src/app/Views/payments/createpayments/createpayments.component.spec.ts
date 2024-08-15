import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepaymentsComponent } from './createpayments.component';

describe('CreatepaymentsComponent', () => {
  let component: CreatepaymentsComponent;
  let fixture: ComponentFixture<CreatepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
