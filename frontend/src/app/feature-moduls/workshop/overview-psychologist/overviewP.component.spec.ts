import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewForPsychologist } from './overviewP.component';
describe('OverviewForPsychologist', () => {
  let component: OverviewForPsychologist;
  let fixture: ComponentFixture<OverviewForPsychologist>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewForPsychologist]
    });
    fixture = TestBed.createComponent(OverviewForPsychologist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
