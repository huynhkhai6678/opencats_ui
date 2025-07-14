import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateActivitiesComponent } from './candidate-activities.component';

describe('CandidateActivitiesComponent', () => {
  let component: CandidateActivitiesComponent;
  let fixture: ComponentFixture<CandidateActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
