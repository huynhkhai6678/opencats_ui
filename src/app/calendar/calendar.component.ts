import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule, DatePipe } from '@angular/common';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';
import moment from 'moment';
import { ApiService } from '../services/api.service';
import { CalendarModelComponent } from './calendar-model/calendar-model.component';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-calendar',
  imports: [
    DatePipe,
    ButtonModule,
    MessageModule,
    FullCalendarModule,
    CalendarModelComponent,
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  apiService = inject(ApiService);
  @ViewChild(CalendarModelComponent) calendarModal!: CalendarModelComponent;
   @ViewChild(FullCalendarComponent) calendarRef!: FullCalendarComponent; 

  upcommingEvents = signal<any[]>([]);
  
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      momentPlugin,
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin
    ],
    locale: 'en',
    buttonText: {
      today: 'Today',
      day: 'Day',
      week: 'Week',
      month: 'Month',
    },
    headerToolbar: {
      left: 'title',
      center: 'prev,next today',
      right: 'timeGridDay,dayGridWeek,dayGridMonth',
    },
    initialView: 'dayGridWeek',
    dayMaxEvents: true,
    firstDay: 1,
    allDaySlot: false,
    slotDuration: '00:30:00',
    selectable:true,
    views: {
      dayGridWeek: {
        titleFormat: 'DD MMM YYYY',
        dayHeaderFormat: 'dddd, DD/MM',
        eventMaxStack: 2,
        dayPopoverFormat: 'DD MMM YYYY',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        },
      },
      timeGridDay: {
        titleFormat: 'DD MMM YYYY',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        },
      },
      dayGridMonth: {
        displayEventTime: false
      }
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventContent: (arg) => {
      const formattedStartTime = arg.event?.start?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const currentView = arg.view.type;
      let content = '';
      console.log(arg.event._def.extendedProps);

      switch (currentView) {
        case 'dayGridWeek':
          content = `
            <div class="flex flex-col">
              <strong>${formattedStartTime}</strong>
              <span>${arg.event.title} - ${arg.event._def.extendedProps['entered_user']?.first_name} ${arg.event._def.extendedProps['entered_user']?.last_name}</span>
            </div>
          `;
          break;
        case 'timeGridDay':
          const durationStr = arg.event._def.extendedProps['all_day'] ? '' : `(${arg.event._def.extendedProps['event_duration']} minutes)`;
          console.log(durationStr);
          content = `
            <div class="flex flex-col">
              <strong>${formattedStartTime} ${durationStr}</strong>
              <span>${arg.event.title} - ${arg.event._def.extendedProps['entered_user']?.first_name} ${arg.event._def.extendedProps['entered_user']?.last_name}</span>
            </div>
          `;
          break;
        case 'dayGridMonth':
          content = `
            <div class="flex flex-col">
              <strong>${formattedStartTime}</strong>
              <span>${arg.event.title} - ${arg.event._def.extendedProps['entered_user']?.first_name} ${arg.event._def.extendedProps['entered_user']?.last_name}</span>
            </div>`;
          break;
        default:
          content = `${arg.event.title}`;
          break;
      }

      return { html: content };
    }
  });

  ngOnInit(): void {
    const calendarOptions = this.calendarOptions();
    const time = moment().format("HH:mm:ss");
    calendarOptions.scrollTime = time;

    this.calendarOptions.set(calendarOptions);
    this.loadData();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.calendarModal.header.set('Create event');
    this.calendarModal.id.set(0);

    this.calendarModal.calendarForm.controls['all_day'].setValue(true);
    this.calendarModal.calendarForm.controls['public'].setValue(false);
    this.calendarModal.calendarForm.controls['date'].setValue(selectInfo.start);
    this.calendarModal.calendarForm.controls['time'].setValue(selectInfo.start);
    this.calendarModal.initFormData();
    this.calendarModal.visible.set(true);
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.calendarModal.header.set('Edit event');
    this.calendarModal.id.set(clickInfo.event._def.extendedProps['calendar_event_id']);
    this.calendarModal.initFormData();
    this.calendarModal.visible.set(true);
  }

  loadData() {
    this.apiService.get(`calendar`).subscribe((res : any) => {
      const data = res['data'];
      const upcommingEvents : any[] = [];

      data.forEach((item : any) => {
        item.event_duration = item.duration;
        if (moment(item.date).startOf('day').isSameOrAfter(moment().startOf('day'))) {
          upcommingEvents.push(item);
        }
      });

      this.upcommingEvents.set(upcommingEvents);
      this.calendarOptions.update((options) => ({
        ...options,
        events: [...data]
      }));
    });
  }

  goToDayView(date: string) {
    const calendarApi = this.calendarRef.getApi();

    // Navigate to today's date in day view
    calendarApi.changeView('timeGridDay');
    calendarApi.gotoDate(date);
  }
}
