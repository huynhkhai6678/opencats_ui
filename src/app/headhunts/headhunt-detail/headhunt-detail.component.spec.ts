import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhuntDetailComponent } from './headhunt-detail.component';

describe('HeadhuntDetailComponent', () => {
  let component: HeadhuntDetailComponent;
  let fixture: ComponentFixture<HeadhuntDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadhuntDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadhuntDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
