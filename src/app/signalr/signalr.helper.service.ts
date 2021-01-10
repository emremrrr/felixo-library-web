import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { Role } from '../models/role.model';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})


export class SignalrHelper
{

  private hubConnection: signalR.HubConnection;
  private auth;
  constructor()
  {
    this.auth = JSON.parse(localStorage.getItem("auth"));
  }

  startConnection()
  {
    console.log("begin");


    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44349/request')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))

  }
  getConnectionId()
  {
    this.hubConnection.on('ClientIdMethod', (data) =>
    {
      console.log('client Id:' + data);
      this.hubConnection.invoke('GetDataFromClient', this.auth.Id, data).catch(err => console.log(err));
    });
  }
  addTransferDataListener()
  {
    this.hubConnection.on("requestdata", data =>
    {
      alert("notify " + data.applicationUser.email + "  book name:  " + data.book.name);
      console.log("requestdata");
      console.log(data);
    });
  }
  notifyUser()
  {

    //console.log("auth.id");
    //console.log(auth.Id);
    //this.hubConnection.on(auth.Id, res=>
    //{
    //  console.log(res);
    //  alert("notify " + res.applicationUser.email);

    //});
  }

}
