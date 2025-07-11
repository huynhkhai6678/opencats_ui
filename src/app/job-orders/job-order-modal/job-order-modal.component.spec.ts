import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderModalComponent } from './job-order-modal.component';

describe('JobOrderModalComponent', () => {
  let component: JobOrderModalComponent;
  let fixture: ComponentFixture<JobOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOrderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
