import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message_service';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { Form, GetLocationInfo, MapPoint } from '../interfaces';

@Injectable({
    providedIn: 'root'
})

export class HomeServices {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private url = 'http://34.105.133.177:3001';
    private token = '';
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getMapPoint(mapPoint: MapPoint) {
        const urll = `${this.url}/maps?geocode=[${mapPoint.lat}, ${mapPoint.lng}]`;
        return this.http.get<GetLocationInfo>(urll).pipe(
          tap(_ => this.log(`fetched hotel name=${mapPoint}`)),
          catchError(this.handleError<GetLocationInfo>(`getHotel id=${mapPoint}`))
        );
    }

    getMapPointByAddress(geocode: string) {
        const urll = `${this.url}/maps/raw?geocode=${geocode}`;
        return this.http.get<GetLocationInfo>(urll).pipe(
          tap(_ => this.log(`fetched hotel name=${geocode}`)),
          catchError(this.handleError<GetLocationInfo>(`getHotel id=${geocode}`))
        );
    }

    getAddressByCad(cad: string) {
        const urll = `${this.url}/maps/info-by-cad?cad=${cad}`;
        return this.http.get<{location: string, area: number}>(urll).pipe(
          tap(_ => this.log(`fetched hotel name=${cad}`)),
          catchError(this.handleError<{location: string, area: number}>(`getHotel id=${cad}`))
        );
    }

    postForm(form: Form) {
        return this.http.post<Form>(`${this.url}/forms`, form, this.httpOptions).pipe(
            tap((form: Form) => this.log(`added form w/ id=${form.id}`)),
            catchError(this.handleError<Form>('addHero'))
          );
    }

    updateForm(form: Form, id: string) {
        return this.http.put<Form>(`${this.url}/forms/${id}`, form, this.httpOptions).pipe(
            tap((form: Form) => this.log(`added form w/ id=${form.id}`)),
            catchError(this.handleError<Form>('addHero'))
          );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); // log to console instead
          this.log
          (`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}