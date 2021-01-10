import { Component, ViewChild, Injectable, Input } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { BookRepository } from '../repository/book.repository';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'books',
  templateUrl: './book.component.html',
  styleUrls: []
})

export class BookComponent
{
  columnDefs = [
    { headerName: 'Book Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Category Name', field: 'category.categoryName', sortable: true, filter: true },
  ];
  defaultColDef = { resizable: true };
  bookData = [];

  public requestData = [];
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public selected;

  constructor(
    private bookReposiyory: BookRepository,
    private router: Router
  )
  {
    this.bookReposiyory.getBooks().subscribe(b =>
    {
      this.bookData = b;
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
    var stt = JSON.stringify(this.selected);
    this.router.navigate(["/detail"], { state: { data: this.selected  } });
  }
}
