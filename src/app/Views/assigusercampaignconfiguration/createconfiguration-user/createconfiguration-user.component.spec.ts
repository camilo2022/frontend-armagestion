import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateconfigurationUserComponent } from './createconfiguration-user.component';

describe('CreateconfigurationUserComponent', () => {
  let component: CreateconfigurationUserComponent;
  let fixture: ComponentFixture<CreateconfigurationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateconfigurationUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateconfigurationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
