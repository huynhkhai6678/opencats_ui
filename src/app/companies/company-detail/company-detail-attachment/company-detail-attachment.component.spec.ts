import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailAttachmentComponent } from './company-detail-attachment.component';

describe('CompanyDetailAttachmentComponent', () => {
  let component: CompanyDetailAttachmentComponent;
  let fixture: ComponentFixture<CompanyDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailAttachmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
