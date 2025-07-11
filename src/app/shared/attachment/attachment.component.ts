import { Component, inject, input, signal, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { httpResource } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-attachment',
  imports: [
    FontAwesomeModule,
    FileUploadModule,
    ButtonModule,
  ],
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss'
})
export class AttachmentComponent {
  readonly apiUrl = environment.apiUrl;
  readonly faTrash = faTrash;

  @ViewChild(FileUpload) fu!: FileUpload;

  id = input<number>(0);
  type = input<string>('');
  typeNumber = input<number>(0);

  allowSubmit = signal<boolean>(false);

  formService = inject(FormService);
  apiService = inject(ApiService);
  messageService = inject(MessageService);

  attachments = httpResource<any[]>(
    () => {
      if (this.id() === 0) {
        return;
      }
      return `${this.apiUrl}${this.type()}/${this.id()}/attachments`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  onSelect(event : any) {
    this.allowSubmit.set(true);
  }

  onUpload(event: any) {
    const file: File = event.files[0];
    this.formService.submitAttachmentFile(this.id(), this.typeNumber(), file).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Delete Attachment', detail: res.message });
      this.attachments.reload();
      this.fu.clear();
      this.allowSubmit.set(false);
    });
  }

  deleteAttachment(id: number) {
     this.apiService.delete(`attachments/${id}`).subscribe((res : any) => {
        this.messageService.add({ severity: 'success', summary: 'Delete Attachment', detail: res.message });
        this.attachments.reload();
     })
  }
}
