import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateusersComponent } from './createusers.component';

describe('CreateusersComponent', () => {
  let component: CreateusersComponent;
  let fixture: ComponentFixture<CreateusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
