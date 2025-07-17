import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineModalComponent } from './pipeline-modal.component';

describe('PipelineModalComponent', () => {
  let component: PipelineModalComponent;
  let fixture: ComponentFixture<PipelineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
