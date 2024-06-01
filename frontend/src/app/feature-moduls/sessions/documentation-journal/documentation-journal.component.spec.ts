import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationJournalComponent } from './documentation-journal.component';

describe('DocumentationJournalComponent', () => {
  let component: DocumentationJournalComponent;
  let fixture: ComponentFixture<DocumentationJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentationJournalComponent]
    });
    fixture = TestBed.createComponent(DocumentationJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
