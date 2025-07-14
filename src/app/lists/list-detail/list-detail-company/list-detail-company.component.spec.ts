import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailCompanyComponent } from './list-detail-company.component';

describe('ListDetailCompanyComponent', () => {
  let component: ListDetailCompanyComponent;
  let fixture: ComponentFixture<ListDetailCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDetailCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
