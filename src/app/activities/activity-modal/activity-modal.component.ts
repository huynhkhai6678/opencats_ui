import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { BaseComponent } from '../../base/base.component';
import { ActivityType } from '../../model/activity-type.model';
import moment from 'moment';

@Component({
  selector: 'app-activity-modal',
  imports: [
    MessageModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './activity-modal.component.html',
  styleUrl: './activity-modal.component.scss'
})
export class ActivityModalComponent extends BaseComponent implements OnInit {
  override url = 'activities';
  activityForm! : FormGroup;
  visible = model<boolean>(false);

  options = signal<ActivityType[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      date_created: ['', [Validators.required]],
      type: ['', [Validators.required]],
      notes: ['', [Validators.required]]
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      this.options.set(response['options']);

      if(response['data']) {
        let activity = response['data'];
        activity.date_created = moment(activity.date_created).toDate();
        this.activityForm.patchValue(activity);
      }
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.activityForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}
