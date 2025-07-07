import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(
    private apiService: ApiService,
  ) {}

  getInitData(url: string) {
    return this.apiService.get(url);
  }

  checkInvalidFields(form : FormGroup) {
    const invalidFields : any = [];
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control?.invalid) {
        invalidFields.push(field);
      }
    });
    console.log(invalidFields);
  }

  submitForm(
    url: string,
    id: number | null,
    value: any,
  ): Observable<any> {
    if (id) {
      return this.apiService.patch(`${url}/${id}`, value);
    } else {
      return this.apiService.post(url, value);
    }
  }

  submitFormWithImage(
    url: string,
    id: number | null,
    value: any,
  ): Observable<any> {
    if (id) {
      return this.apiService.postFileWithParams(`${url}/${id}`, value);
    } else {
      return this.apiService.postFileWithParams(url, value);
    }
  }
}