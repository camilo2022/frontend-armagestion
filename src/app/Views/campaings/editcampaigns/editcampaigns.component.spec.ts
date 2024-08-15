import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcampaignsComponent } from './editcampaigns.component';

describe('EditcampaignsComponent', () => {
  let component: EditcampaignsComponent;
  let fixture: ComponentFixture<EditcampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
