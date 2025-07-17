import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { BaseComponent } from '../../base/base.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pipeline-modal',
  imports: [
    ButtonModule,
    DialogModule,
    SelectModule,
    CheckboxModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './pipeline-modal.component.html',
  styleUrl: './pipeline-modal.component.scss'
})
export class PipelineModalComponent extends BaseComponent implements OnInit {
  override url = 'candidate-joborder';

  statuses = signal<any[]>([]);
  types = signal<any[]>([]);

  isJobOrder = signal<boolean>(true);

  pipelineForm! : FormGroup;
  visible = model<boolean>(false);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.pipelineForm = this.fb.group({
      status: [100, []],
      change_status : [true],
      create_activity : [true],
      activity_type : [100],
      activity_notes : [''],
    });

    this.pipelineForm.get('create_activity')?.valueChanges.subscribe(val => {
      const control = this.pipelineForm.get('activity_notes');
      if (val) {
        control?.enable();
      } else {
        control?.disable();
      }
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      this.types.set(response['types']);
      this.statuses.set(response['statuses']);

      if (response['data']) {
        this.pipelineForm.controls['status'].setValue(response['data']['status']);
      }
    });
  }

  override onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.apiService.post(`candidate-joborder/${this.id()}/update-status`, value).subscribe((res: any) => {
      this.isSubmitted = false;
      this.pipelineForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}
