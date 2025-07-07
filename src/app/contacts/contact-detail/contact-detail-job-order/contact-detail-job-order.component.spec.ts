import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailJobOrderComponent } from './contact-detail-job-order.component';

describe('ContactDetailJobOrderComponent', () => {
  let component: ContactDetailJobOrderComponent;
  let fixture: ComponentFixture<ContactDetailJobOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailJobOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailJobOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
