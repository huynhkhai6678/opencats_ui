import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    return this.httpClient.get(`${environment.apiUrl}` + url);
  }

  post(url: string, params: any) {
    return this.httpClient.post(`${environment.apiUrl}` + url, params);
  }

  patch(url: string, params: any){
    return this.httpClient.patch(`${environment.apiUrl}` + url, params);
  }

  put(url: string, params: any){
    return this.httpClient.put(`${environment.apiUrl}` + url, params);
  }

  delete(url: string){
    return this.httpClient.delete(`${environment.apiUrl}` + url);
  }

  downloadFile(url: string) {
    return this.httpClient.get(`${environment.apiUrl}` + url, {
      headers: new HttpHeaders({
        'Accept': 'application/octet-stream',
      }),
      responseType: 'blob' 
    });
  }

  postFileWithParams(url: string, params: Record<string, any>): Observable<any> {
    const formData = new FormData();
    // Append additional fields
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (params[key] === null || params[key] === undefined) {
          continue;
        }

        if (key === 'contact') {
          formData.append('region_code', params[key]['dialCode']);
          formData.append('contact', params[key]['e164Number'].split(params[key]['dialCode'])[1]);
        } else if (key === 'other_contact') {
          formData.append('other_region_code', params[key]['dialCode']);
          formData.append('other_contact', params[key]['e164Number'].split(params[key]['dialCode'])[1]);
        } else {
          formData.append(key, params[key]);
        }
      }
    }
    return this.httpClient.post(`${environment.apiUrl}${url}`, formData);
  }

  getPaginatedData(url : string, options: {
    page: number;
    size: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    filter?: string;
    filterOptions? : any;
  }): Observable<{ data: any[]; total: number }> {
    let params = new HttpParams()
      .set('page', options.page.toString())
      .set('size', options.size.toString());

    if (options.sortField) {
      params = params.set('sortField', options.sortField);
      params = params.set('sortOrder', options.sortOrder || 'asc');
    }

    if (options.filter) {
      params = params.set('filter', options.filter);
    }

    for (let key in options.filterOptions) {
      const value = options.filterOptions[key];
      params = params.set(key, value);
    }

    // if (options.filterOptions) {
    //   params = params.set('startDate', options.startDate);
    //   params = params.set('endDate', options.endDate);
    // }

    return this.httpClient.get<{ data: any[]; total: number }>(`${environment.apiUrl}${url}`, { params });
  }
}
