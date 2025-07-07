import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailActivityComponent } from './contact-detail-activity.component';

describe('ContactDetailActivityComponent', () => {
  let component: ContactDetailActivityComponent;
  let fixture: ComponentFixture<ContactDetailActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
