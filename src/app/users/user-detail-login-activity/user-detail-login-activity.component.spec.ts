import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailLoginActivityComponent } from './user-detail-login-activity.component';

describe('UserDetailLoginActivityComponent', () => {
  let component: UserDetailLoginActivityComponent;
  let fixture: ComponentFixture<UserDetailLoginActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailLoginActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailLoginActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
