import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecyclesComponent } from './createcycles.component';

describe('CreatecyclesComponent', () => {
  let component: CreatecyclesComponent;
  let fixture: ComponentFixture<CreatecyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecyclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
