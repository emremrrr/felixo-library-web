import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book.component/book.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './login.component/login.component';
import { FormsModule } from '@angular/forms';
import { Requestomponent } from './request.component/request.component';
import { DetailComponent } from './detail.component/detail.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    Requestomponent,
    LoginComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'books', component: BookComponent },
      { path: 'login', component: LoginComponent, pathMatch:'full' },
      { path: 'request', component: Requestomponent },
      { path: 'detail', component: DetailComponent },
    ],{ useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent, BookComponent]
})
export class AppModule { }
