import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IResponseEntries } from '../interfaces/entries';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  url:string = "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"

  constructor(public http: HttpClient) {

  }

  getImages(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.url)
  }
}
