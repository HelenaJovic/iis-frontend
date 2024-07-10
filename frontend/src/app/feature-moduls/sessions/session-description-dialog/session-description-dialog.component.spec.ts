import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDescriptionDialogComponent } from './session-description-dialog.component';

describe('SessionDescriptionDialogComponent', () => {
  let component: SessionDescriptionDialogComponent;
  let fixture: ComponentFixture<SessionDescriptionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionDescriptionDialogComponent]
    });
    fixture = TestBed.createComponent(SessionDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
