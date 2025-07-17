import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhuntsComponent } from './headhunts.component';

describe('HeadhuntsComponent', () => {
  let component: HeadhuntsComponent;
  let fixture: ComponentFixture<HeadhuntsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadhuntsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadhuntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
