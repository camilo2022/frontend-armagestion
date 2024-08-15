import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefocusComponent } from './createfocus.component';

describe('CreatefocusComponent', () => {
  let component: CreatefocusComponent;
  let fixture: ComponentFixture<CreatefocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatefocusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatefocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
