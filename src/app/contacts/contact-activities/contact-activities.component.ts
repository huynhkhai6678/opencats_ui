import { DatePipe } from '@angular/common';
import { Component, input, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ActivityModalComponent } from '../../activities/activity-modal/activity-modal.component';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from '../../base/base.component';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-contact-activities',
  imports: [
    DatePipe,
    ButtonModule,
    TableModule,
    FontAwesomeModule,
    SafeHtmlPipe,
    ActivityModalComponent
  ],
  templateUrl: './contact-activities.component.html',
  styleUrl: './contact-activities.component.scss'
})
export class ContactActivitiesComponent extends BaseComponent {
  override url = 'activities';
  faTrash = faTrash;
  faPencil = faPencil;

  readonly apiUrl = environment.apiUrl;
  contactId = input.required<number>();
  activities = httpResource<any[]>(
    () => {
      if (this.contactId() === 0) {
        return;
      }
      return `${this.apiUrl}contacts/${this.contactId()}/activities`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  @ViewChild(ActivityModalComponent) activityModal!: ActivityModalComponent;

  create() {
    this.activityModal.header.set('Create activity');
    this.activityModal.dataType.set(300);
    this.activityModal.visible.set(true);
    this.activityModal.dataItemId.set(this.contactId());
    this.activityModal.initFormData();
  }

  edit(id: number) {
    this.activityModal.id.set(id);
    this.activityModal.header.set('Edit activity');
    this.activityModal.dataType.set(300);
    this.activityModal.visible.set(true);
    this.activityModal.initFormData();
  }

  deleteItem(event : Event, id: number) {
    this.id.set(id);
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.activities.reload();
    });
  }

  reloadData() {
    this.activities.reload();
  }
}
