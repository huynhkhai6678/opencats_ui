import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginActivitiesComponent } from './login-activities.component';

describe('LoginActivitiesComponent', () => {
  let component: LoginActivitiesComponent;
  let fixture: ComponentFixture<LoginActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
