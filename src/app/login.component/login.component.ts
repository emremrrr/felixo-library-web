import { Component, ViewChild, Injectable, OnInit, Input } from '@angular/core';
import { BookRepository } from '../repository/book.repository';
import { UserRepository } from '../repository/user.repository';
import { Role } from '../models/role.model';
import { Router } from '@angular/router';
import { NavHelper } from '../helpers/nav.helper';
import { AuthHelper } from '../helpers/authentication.helper';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: []
})

export class LoginComponent
{
  public userName: string="";
  public password: string = "";

  constructor(
    public navHelper: NavHelper,
    private authHelper:AuthHelper
  )
  {

  }

  login()
  {
    this.authHelper.login(this.userName, this.password);
  }
}
