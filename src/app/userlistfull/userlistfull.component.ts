import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-userlistfull',
  templateUrl: './userlistfull.component.html',
  styleUrls: ['./userlistfull.component.css']
})
export class UserlistfullComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTableParameters: any, callback) => {
        this.http.get("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525").subscribe((response: any) => {
          console.log(response);
          callback({
            // recordsTotal: response.length,
            // recordsFiltered: response,
            data: response
          });
        })
      },
      columns: [{
        title: 'ID Number',
        data: 'id'
      }, {
        title: 'First name',
        data: 'name'
      }, {
        title: 'Email',
        data: 'email'
      }, {
        title: 'Gender',
        data: 'gender'
      }, {
        title: 'Status',
        data: 'status'
      }]
    };
  }

}
