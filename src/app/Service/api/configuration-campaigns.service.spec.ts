import { TestBed } from '@angular/core/testing';

import { ConfigurationCampaignsService } from './configuration-campaigns.service';

describe('ConfigurationCampaignsService', () => {
  let service: ConfigurationCampaignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationCampaignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
