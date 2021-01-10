import { Component, ViewChild, Injectable, OnInit, Input } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { RequestRepository } from '../repository/request.repository';
import { AuthHelper } from '../helpers/authentication.helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: []
})

export class Requestomponent
{
  columnDefs = [
    { headerName: 'beginDate', field: 'beginDate', sortable: true, filter: true },
    { headerName: 'endDate', field: 'endDate', sortable: true, filter: true },
    { headerName: 'isApproved', field: 'isApproved', sortable: true, filter: true },
    { headerName: 'book', field: 'book.name', sortable: true, filter: true },
    { headerName: 'requested by', field: 'applicationUser.email', sortable: true, filter: true }
  ];
  defaultColDef = { resizable: true };
  public requestData = [];
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public selected;

  constructor(
    private requestReposiyory: RequestRepository,
    private authHelper: AuthHelper,
    private router: Router
  )
  {
    if (authHelper.userRoles.filter(p => p.name == "Admin").length ==0)
        this.router.navigate(['/books']);
    this.requestReposiyory.getRequests().subscribe(r =>
    {
      this.requestData = r;
    });


    this.gridOptions = <GridOptions>{
      onGridReady: (event) => this.onGridReady(event),
      rowSelection: 'single',
      allowContextMenuWithControlKey: true,
      onSelectionChanged: (event) => this.selectedRow(event)
    }
  }


  onGridReady(param)
  {
    this.gridApi = param.api;
  }


  selectedRow(params)
  {
    this.selected = this.gridApi.getSelectedRows()[0];
    this.selected.isApproved = true;
    this.requestReposiyory.respondRequest(this.selected).subscribe(res =>
    {
    });
  }
}
