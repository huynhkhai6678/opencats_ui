import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-attachments',
  imports: [],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;

  sanitizedFileUrl!: SafeResourceUrl;

  apiService = inject(ApiService);
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : any) => {
      const fileUrl = `${this.apiUrl}attachments/${params['attachmentId']}/${params['attachmentHash']}`;
      this.sanitizedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    });
  }
}
