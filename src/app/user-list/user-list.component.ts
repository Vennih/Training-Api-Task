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

  // function to form table using the data from the api
  showUsers() {
    this.http.get("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = data;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  // function to filter the data in the table using the search bar
  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  // Redirecting to userlist component on click to Userlist in the navbar
  goToUserList() {
    this.route.navigate(["userlist"]);
  }

  // Redirecting to login component on click to logout button
  logout() {
    this.route.navigate(["login"]);
  }

  // Redirecting to adduser component on click to Add user button
  goToAddUser() {
    this.route.navigate(["adduser"]);
  }

  // Redirecting to popup component on click to edit icon inside the table
  editUser(id: number) {
    this.commonService.sendData(id)
    this.route.navigate(['edituser'])
  }

  // Redirecting to view popup component on click to view icon inside the table
  openUserData(id: number) {
    this.commonService.sendData(id)
    this.route.navigate(['viewuser'])
  }

  // delete the user from table list on click to delete icon inside the table
  deleteUser(id: number) {
    console.log(id)
    if (confirm("Are you sure to delete?")) {
      this.http.delete("https://gorest.co.in/public/v2/users/" + id + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
        .subscribe(data => this.userData = data)
      alert("User Detail Deleted Succesfully")
      this.ngOnInit();
    } else {
      alert("User Details not deleted")
    }
    // window.location.reload();
  }
}
