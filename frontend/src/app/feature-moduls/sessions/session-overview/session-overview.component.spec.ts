import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionOverviewComponent } from './session-overview.component';

describe('SessionOverviewComponent', () => {
  let component: SessionOverviewComponent;
  let fixture: ComponentFixture<SessionOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionOverviewComponent]
    });
    fixture = TestBed.createComponent(SessionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
