import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobOrderPipelineComponent } from './candidate-job-order-pipeline.component';

describe('CandidateJobOrderPipelineComponent', () => {
  let component: CandidateJobOrderPipelineComponent;
  let fixture: ComponentFixture<CandidateJobOrderPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateJobOrderPipelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateJobOrderPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
