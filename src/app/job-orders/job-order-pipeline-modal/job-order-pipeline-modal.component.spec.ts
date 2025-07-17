import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderPipelineModalComponent } from './job-order-pipeline-modal.component';

describe('JobOrderPipelineModalComponent', () => {
  let component: JobOrderPipelineModalComponent;
  let fixture: ComponentFixture<JobOrderPipelineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOrderPipelineModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOrderPipelineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
