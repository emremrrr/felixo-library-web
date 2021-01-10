import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NavHelper } from './nav.helper';
import { UserRepository } from '../repository/user.repository';
import { Role } from '../models/role.model';
import { SignalrHelper } from '../signalr/signalr.helper.service';


@Injectable({
  providedIn: 'root'
})


export class AuthHelper
{
  //roles: Role[] = [];

  roles: Subject<Role[]> = new Subject<Role[]>();
  public userRoles: Role[]=[];
  constructor(private navHelper: NavHelper,
    private signalrHelper: SignalrHelper,
    private router: Router,
    private userRepository: UserRepository)
  {

  }
  authInit()
  {
    this.roles.subscribe(r =>
    {
      this.userRoles = r;
    })
    var auth = JSON.parse(localStorage.getItem("auth"));

    if (auth != null)
    {
      var roles = JSON.parse(auth.role);
      this.navHelper.user.next(auth.email);
      this.roles.next(roles);
      this.startSignalR();

    }
    else
      this.router.navigate(['/login']);
  }
  startSignalR()
  {
      this.signalrHelper.startConnection();
      this.signalrHelper.addTransferDataListener();
      this.signalrHelper.getConnectionId();
      this.signalrHelper.notifyUser();
  }

  login(userName: string, password: string)
  {
    this.userRepository.login({ Email: userName, Password: password }).subscribe(t =>
    {
      var tokenDecoded = this.parseJwt(t.jwt)
      this.navHelper.user.next(tokenDecoded.email);
      console.log(tokenDecoded);
      localStorage.setItem("auth", JSON.stringify(tokenDecoded));
      localStorage.setItem("bearer", t.jwt);
      var r = JSON.parse(tokenDecoded.role);
      console.log(r.filter(p => p.name == "Admin"))
      this.startSignalR();

      if (r.filter(p => p.name == "Admin").length > 0)
      {
        this.router.navigate(['/request']);
      }
      else
      {
        this.router.navigate(['/books']);
      }
    })
  }

  logout()
  {
    localStorage.clear();
    this.navHelper.user.next("");

    this.router.navigate(['/login']);

  }

  parseJwt(token)
  {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c)
    {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getCurrentUser()
  {
    return JSON.parse(localStorage.getItem("auth"));
  }
}
