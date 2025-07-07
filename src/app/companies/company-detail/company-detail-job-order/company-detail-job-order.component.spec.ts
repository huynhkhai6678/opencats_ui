import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailJobOrderComponent } from './company-detail-job-order.component';

describe('CompanyDetailJobOrderComponent', () => {
  let component: CompanyDetailJobOrderComponent;
  let fixture: ComponentFixture<CompanyDetailJobOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailJobOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailJobOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
