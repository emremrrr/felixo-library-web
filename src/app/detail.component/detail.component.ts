import { Component, ViewChild, Injectable, OnInit, Input } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BookRepository } from '../repository/book.repository';
import { Router } from '@angular/router';
import { RequestRepository } from '../repository/request.repository';
import { AuthHelper } from '../helpers/authentication.helper';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: []
})

export class DetailComponent
{

  public bookObj;
  public beginDate;
  public endDate;
  constructor(
    private router: Router,
    private requestRepository: RequestRepository,
    private authHelper: AuthHelper
  )
  {
    this.bookObj = router.getCurrentNavigation().extras.state.data;
    //alert(JSON.stringify(this.bookObj));

  }

  request()
  {

    this.requestRepository.requestBook( {
      Id: "0",
      BeginDate: new Date(this.beginDate),
      EndDate: new Date(this.endDate),
      IsApproved: false,
      ApplicationUser: this.authHelper.getCurrentUser().email,
      Book: {
        Id: this.bookObj.id,
        Name: this.bookObj.name,
        Category: this.bookObj.category
      }
    }).subscribe(res => { alert("saved")});
  }
}
