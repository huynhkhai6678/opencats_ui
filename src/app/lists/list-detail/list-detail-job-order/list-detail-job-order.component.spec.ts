import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailJobOrderComponent } from './list-detail-job-order.component';

describe('ListDetailJobOrderComponent', () => {
  let component: ListDetailJobOrderComponent;
  let fixture: ComponentFixture<ListDetailJobOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetailJobOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailJobOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
