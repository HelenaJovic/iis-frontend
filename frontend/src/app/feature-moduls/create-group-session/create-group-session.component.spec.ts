import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupSessionComponent } from './create-group-session.component';

describe('CreateGroupSessionComponent', () => {
  let component: CreateGroupSessionComponent;
  let fixture: ComponentFixture<CreateGroupSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroupSessionComponent]
    });
    fixture = TestBed.createComponent(CreateGroupSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
