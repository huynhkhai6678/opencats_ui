import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhuntCandidatesComponent } from './headhunt-candidates.component';

describe('HeadhuntCandidatesComponent', () => {
  let component: HeadhuntCandidatesComponent;
  let fixture: ComponentFixture<HeadhuntCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadhuntCandidatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadhuntCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
