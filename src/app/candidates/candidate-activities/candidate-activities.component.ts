import { Component, input, ViewChild } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import { BaseComponent } from '../../base/base.component';
import { ActivityModalComponent } from '../../activities/activity-modal/activity-modal.component';

@Component({
  selector: 'app-candidate-activities',
  imports: [
    DatePipe,
    ButtonModule,
    TableModule,
    FontAwesomeModule,
    SafeHtmlPipe,
    ActivityModalComponent
],
  templateUrl: './candidate-activities.component.html',
  styleUrl: './candidate-activities.component.scss'
})
export class CandidateActivitiesComponent extends BaseComponent {
  override url = 'activities';
  faTrash = faTrash;
  faPencil = faPencil;

  readonly apiUrl = environment.apiUrl;
  candidateId = input<number>(0);
  activities = httpResource<any[]>(
    () => {
      if (this.candidateId() === 0) {
        return;
      }
      return `${this.apiUrl}candidates/${this.candidateId()}/activities`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  @ViewChild(ActivityModalComponent) activityModal!: ActivityModalComponent;

  create() {
    this.activityModal.header.set('Create activity');
    this.activityModal.visible.set(true);
    this.activityModal.dataType.set(100);
    this.activityModal.dataItemId.set(this.candidateId());
    this.activityModal.initFormData();
  }

  edit(id: number) {
    this.activityModal.id.set(id);
    this.activityModal.header.set('Edit activity');
    this.activityModal.visible.set(true);
    this.activityModal.dataType.set(100);
    this.activityModal.dataItemId.set(this.candidateId());
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
