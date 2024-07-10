import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryComponent } from './session-history.component';

describe('SessionHistoryComponent', () => {
  let component: SessionHistoryComponent;
  let fixture: ComponentFixture<SessionHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionHistoryComponent]
    });
    fixture = TestBed.createComponent(SessionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
