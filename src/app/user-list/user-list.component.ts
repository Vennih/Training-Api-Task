import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userData: any;

  displayedColumns: any = ['id', 'name', 'email', 'gender', 'status', 'option'];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pduserId: number | undefined;
  cIselectedId: number | undefined;

  constructor(private http: HttpClient, private route: Router, private dialogRef: MatDialog, private commonService: CommonService) {
    
  }

  ngOnInit(): void {
    this.showUsers()

  }

  showUsers() {
    this.http.get("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = data;
        console.log(this.userData);
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  goToUserList() {
    this.route.navigate(["userlist"]);
  }

  logout() {
    this.route.navigate(["login"]);
  }

  goToAddUser() {
    this.route.navigate(["adduser"]);
  }

  editUser(id: number) {
    this.commonService.sendData(id)
    this.route.navigate(['edituser'])
  }

  openUserData(id: number) {
    this.commonService.sendData(id)
    this.route.navigate(['viewuser'])
  }

  deleteUser(id: number) {
    console.log(id)
    if (confirm("Are you sure to delete?")) {
      this.http.delete("https://gorest.co.in/public/v2/users/" + id + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
        .subscribe(data => this.userData = data)
        
    }else{
      alert("User Details not deleted")
    }
    window.location.reload();
    alert("User Detail Deleted Succesfully")
  }
}
