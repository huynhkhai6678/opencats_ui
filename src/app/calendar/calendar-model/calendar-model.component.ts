import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import moment from 'moment';

@Component({
  selector: 'app-calendar-model',
  imports: [
    MessageModule,
    DatePickerModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    CheckboxModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule
  ],
  templateUrl: './calendar-model.component.html',
  styleUrl: './calendar-model.component.scss'
})
export class CalendarModelComponent extends BaseComponent implements OnInit {
  override url = 'calendar';
  types = signal<any[]>([]);
  durations = signal<any[]>([
    {
      label: '15 minutes',
      value: 15
    },
    {
      label: '30 minutes',
      value: 30
    },
    {
      label: '45 minutes',
      value: 45
    },
    {
      label: '1 hour',
      value: 60
    },
    {
      label: '1.5 hours',
      value: 90
    },
    {
      label: '2 hours',
      value: 120
    },
    {
      label: '3 hours',
      value: 180
    },
    {
      label: '4 hours',
      value: 240
    },
    {
      label: 'More than 4 hours',
      value: 300
    }
  ]);

  calendarForm! : FormGroup;
  visible = model<boolean>(false);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.calendarForm = this.fb.group({
      title : ['', [Validators.required]],
      type: [100, [Validators.required]],
      public: [false],
      date : ['', [Validators.required]],
      time : ['', [Validators.required]],
      all_day: [true, [Validators.required]],
      duration: [60],
      description: ['']
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      this.types.set(response['types']);

      if(response['data']) {
          let calendar = response['data'];
          calendar.date = moment(calendar.date).toDate();
          calendar.time = moment(calendar.date).toDate();
          calendar.all_day = calendar.all_day ? true : false;
          calendar.public = calendar.public ? true : false;
          this.calendarForm.patchValue(calendar);
      }
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.calendarForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }

  override delete(event : Event) {
    super.delete(event, (message : string) => {
      this.calendarForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}
