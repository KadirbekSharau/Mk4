import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from 'src/app/features/components/interface/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private baseUrl = 'http://34.105.133.177:3001';

  constructor(private http: HttpClient) { }

  getAll (): Observable<Form[]> {
    return this.http.get<Form[]>(this.baseUrl + '/forms/');
  }

  getById (id: number): Observable<Form> {
    return this.http.get<Form>(this.baseUrl + '/forms/' + id + '/');
  }

  deleteById (id: number): Observable<{}> {
    return this.http.delete<{}>(this.baseUrl + '/forms/' + id + '/');
  }
}
