import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecampaignsComponent } from './tablecampaigns.component';

describe('TablecampaignsComponent', () => {
  let component: TablecampaignsComponent;
  let fixture: ComponentFixture<TablecampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecampaignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablecampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
