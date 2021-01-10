import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: "root" })


export class BookRepository
{
  baseurl: string = environment.baseUrl;

  constructor(private http: HttpClient)
  {
  }
  getBooks(): Observable<any>
  {
    return this.http.get(this.baseurl + "Book/GetBooks/");
  }
  getBookById(id: number): Observable<any>
  {
    return this.http.get(this.baseurl + "Book/GetBookDetailsById?Id="+id);
  }
}
