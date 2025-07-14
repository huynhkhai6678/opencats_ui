import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderPipelineComponent } from './job-order-pipeline.component';

describe('JobOrderPipelineComponent', () => {
  let component: JobOrderPipelineComponent;
  let fixture: ComponentFixture<JobOrderPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOrderPipelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOrderPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
