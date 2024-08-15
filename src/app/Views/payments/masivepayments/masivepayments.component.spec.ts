import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasivepaymentsComponent } from './masivepayments.component';

describe('MasivepaymentsComponent', () => {
  let component: MasivepaymentsComponent;
  let fixture: ComponentFixture<MasivepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasivepaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasivepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
