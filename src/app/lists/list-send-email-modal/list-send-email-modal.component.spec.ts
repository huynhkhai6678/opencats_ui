import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSendEmailModalComponent } from './list-send-email-modal.component';

describe('ListSendEmailModalComponent', () => {
  let component: ListSendEmailModalComponent;
  let fixture: ComponentFixture<ListSendEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSendEmailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSendEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
