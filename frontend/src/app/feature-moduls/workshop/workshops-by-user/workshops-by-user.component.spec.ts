import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkshopsUser } from './workshops-by-user.component';
describe('WorkshopsUser', () => {
  let component: WorkshopsUser;
  let fixture: ComponentFixture<WorkshopsUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkshopsUser]
    });
    fixture = TestBed.createComponent(WorkshopsUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
