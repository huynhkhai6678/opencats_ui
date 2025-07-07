import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailContactComponent } from './company-detail-contact.component';

describe('CompanyDetailContactComponent', () => {
  let component: CompanyDetailContactComponent;
  let fixture: ComponentFixture<CompanyDetailContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
