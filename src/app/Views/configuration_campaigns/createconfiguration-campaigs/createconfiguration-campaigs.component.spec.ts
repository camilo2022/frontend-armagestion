import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateconfigurationCampaigsComponent } from './createconfiguration-campaigs.component';

describe('CreateconfigurationCampaigsComponent', () => {
  let component: CreateconfigurationCampaigsComponent;
  let fixture: ComponentFixture<CreateconfigurationCampaigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateconfigurationCampaigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateconfigurationCampaigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
