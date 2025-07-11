import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderChangePasswordComponent } from './home-header-change-password.component';

describe('HomeHeaderChangePasswordComponent', () => {
  let component: HomeHeaderChangePasswordComponent;
  let fixture: ComponentFixture<HomeHeaderChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeaderChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeaderChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
