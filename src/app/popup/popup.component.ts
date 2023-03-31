import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  userData: any;
  fullName: any;

  fullNameFromFirstName: any = "";
  fullNameFromLastName: any = "";
  cOselectedId: any;

  nameUnit: any;
  emailUnit: any;
  genderUnit: any;
  statusUnit: any;
  regex:any = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  constructor(private http: HttpClient, private route: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    // this.fullName = document.querySelector("#inputFullName");
    this.commonService.commonMessage.subscribe(m => this.cOselectedId = m)

    this.nameUnit = document.querySelector(".inputFullName")
    this.emailUnit = document.querySelector(".inputEmail")
    this.genderUnit = document.querySelector(".inputGender")
    this.statusUnit = document.querySelector(".inputStatus")

    this.getSelectedUser()

  }

  getSelectedUser() {
    this.http.get("https://gorest.co.in/public/v2/users/" + this.cOselectedId + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = data;
        this.nameUnit.innerText = this.userData.name;
        this.emailUnit.innerText = this.userData.email;
        this.genderUnit.innerText = this.userData.gender;
        this.statusUnit.innerText = this.userData.status;
      })
  }

  upDateUser(id: number, data: any) {
    console.log(id)
    console.log(data)
    if (data.name != "" && data.email != "" && data.gender != "" && data.status != "") {
      if (data.gender == 'male' || data.gender == 'female') {
        if (data.status == 'active' || data.status == 'inactive') {
          if (this.regex.test(data.email)) {
            this.http.put("https://gorest.co.in/public/v2/users/" + id + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525", data)
              .subscribe(res => {
                console.log(res)
                alert("User Details changed Successfully")
                this.route.navigate(['userlist'])
              })
            console.log(data)
          } else { alert("Enter a valid email") }
        } else { alert("Enter active or inactive only in Status") }
      } else { alert("Enter male or female only in Gender") }
    } else { alert("Please fill all the user details") }
  }

  goToUserList() {
    this.route.navigate(["userlist"]);
  }

}
