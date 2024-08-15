import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableusersinactivesComponent } from './tableusersinactives.component';

describe('TableusersinactivesComponent', () => {
  let component: TableusersinactivesComponent;
  let fixture: ComponentFixture<TableusersinactivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableusersinactivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableusersinactivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
