import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhuntKpiComponent } from './headhunt-kpi.component';

describe('HeadhuntKpiComponent', () => {
  let component: HeadhuntKpiComponent;
  let fixture: ComponentFixture<HeadhuntKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadhuntKpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadhuntKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
