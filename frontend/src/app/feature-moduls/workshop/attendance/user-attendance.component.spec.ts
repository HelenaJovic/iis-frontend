import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendances } from './user-attendance.component';
describe('Attendances', () => {
  let component: Attendances;
  let fixture: ComponentFixture<Attendances>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Attendances]
    });
    fixture = TestBed.createComponent(Attendances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
