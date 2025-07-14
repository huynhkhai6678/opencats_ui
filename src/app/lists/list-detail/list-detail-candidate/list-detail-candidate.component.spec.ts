import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailCandidateComponent } from './list-detail-candidate.component';

describe('ListDetailCandidateComponent', () => {
  let component: ListDetailCandidateComponent;
  let fixture: ComponentFixture<ListDetailCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetailCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
