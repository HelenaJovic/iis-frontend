import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ShowWorkshop } from './one-workshop.component';
import { ShowWorkshopPsychologist } from './one-workshop-psychologist.component';
describe('ShowWorkshop', () => {
  let component: ShowWorkshopPsychologist;
  let fixture: ComponentFixture<ShowWorkshopPsychologist>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowWorkshopPsychologist]
    });
    fixture = TestBed.createComponent(ShowWorkshopPsychologist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
