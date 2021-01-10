import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestModel } from '../models/request.model';
@Injectable({ providedIn: "root" })


export class RequestRepository
{
  baseurl: string = environment.baseUrl;

  constructor(private http: HttpClient)
  {
  }
  getRequests(): Observable<any>
  {
    return this.http.get(this.baseurl + "Request/GetRequests/");
  }
  requestBook(request): Observable<any>
  {
    return this.http.post(this.baseurl + "Request/RequestBook/", request);
  }
  respondRequest(request: RequestModel): Observable<any>
  {
    return this.http.post(this.baseurl + "Request/RespondRequest", request);
  }
}
