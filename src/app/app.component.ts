import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../environments/environment';
import { BookRepository } from './repository/book.repository';
import { RequestRepository } from './repository/request.repository';
import { Router, NavigationEnd } from '@angular/router';
import { NavHelper } from './helpers/nav.helper';
import { AuthHelper } from './helpers/authentication.helper';
import { SignalrHelper } from './signalr/signalr.helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{

  title = 'Felixo-Library-Web';
  baseurl: string = environment.baseUrl;

  ngOnInit()
  {
    console.log("init success");

  }
  constructor(
    public navHelper: NavHelper,
    private router: Router,
    private authHelper: AuthHelper
  )
  {
    this.navHelper.user.subscribe(u =>
    {
      this.navHelper.userName = u;
    });
    this.authHelper.authInit();
  }
  logout()
  {
    this.authHelper.logout();
  }
}
