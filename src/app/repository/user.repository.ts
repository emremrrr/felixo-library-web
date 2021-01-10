import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
@Injectable({ providedIn: "root" })

export class UserRepository
{
  baseurl: string = environment.baseUrl;

  constructor(private http: HttpClient)
  {
  }

  login(user: User): Observable<any>
  {
    return this.http.post(this.baseurl + "User/Login/", user);
  }
}
