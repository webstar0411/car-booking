import { TestBed } from '@angular/core/testing';

import { UserMsgService } from './user-msg.service';

describe('UserMsgService', () => {
  let service: UserMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
