import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderDetailComponent } from './job-order-detail.component';

describe('JobOrderDetailComponent', () => {
  let component: JobOrderDetailComponent;
  let fixture: ComponentFixture<JobOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobOrderDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
