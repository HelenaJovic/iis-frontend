import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewForUser } from './overview-user.component';
describe('OverviewForUser', () => {
  let component: OverviewForUser;
  let fixture: ComponentFixture<OverviewForUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewForUser]
    });
    fixture = TestBed.createComponent(OverviewForUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
