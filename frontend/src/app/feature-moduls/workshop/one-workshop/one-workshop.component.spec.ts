import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowWorkshop } from './one-workshop.component';
describe('ShowWorkshop', () => {
  let component: ShowWorkshop;
  let fixture: ComponentFixture<ShowWorkshop>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowWorkshop]
    });
    fixture = TestBed.createComponent(ShowWorkshop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
