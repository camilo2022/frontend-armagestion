import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecampaignsComponent } from './createcampaigns.component';

describe('CreatecampaignsComponent', () => {
  let component: CreatecampaignsComponent;
  let fixture: ComponentFixture<CreatecampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
