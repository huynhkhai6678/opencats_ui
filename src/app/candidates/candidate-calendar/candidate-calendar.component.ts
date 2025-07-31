import { httpResource } from '@angular/common/http';
import { Component, input, ViewChild } from '@angular/core';
import { CalendarEvent } from '../../calendar/calendar-event.model';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModelComponent } from '../../calendar/calendar-model/calendar-model.component';

@Component({
  selector: 'app-candidate-calendar',
  imports: [
    DatePipe,
    ButtonModule,
    CalendarModelComponent
  ],
  templateUrl: './candidate-calendar.component.html',
  styleUrl: './candidate-calendar.component.scss'
})
export class CandidateCalendarComponent {
  @ViewChild(CalendarModelComponent) calendarModal!: CalendarModelComponent;

  apiUrl = environment.apiUrl;
  candidateId = input.required<number>();
  events = httpResource<CalendarEvent[]>(
    () => {
      if (this.candidateId() === 0) {
        return;
      }
      return `${this.apiUrl}candidates/${this.candidateId()}/calendars`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  createEvent() {
    this.calendarModal.header.set('Create event');
    this.calendarModal.id.set(0);

    this.calendarModal.calendarForm.controls['all_day'].setValue(true);
    this.calendarModal.calendarForm.controls['public'].setValue(false);
    this.calendarModal.calendarForm.controls['data_item_type'].setValue(100);
    this.calendarModal.calendarForm.controls['data_item_id'].setValue(parseInt(this.candidateId().toString()));
    this.calendarModal.calendarForm.controls['date'].setValue(new Date());
    this.calendarModal.calendarForm.controls['time'].setValue(new Date());
    this.calendarModal.initFormData();
    this.calendarModal.visible.set(true);
  }
}
