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

  cOselectedId: any;

  nameUnit: any;
  emailUnit: any;
  genderUnit: any;
  statusUnit: any;
  regex: any = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  firstnameUnit: any;
  lastnameUnit: any;

  constructor(private http: HttpClient, private route: Router, private commonService: CommonService) { }

  ngOnInit(): void {


    this.commonService.commonMessage.subscribe(m => this.cOselectedId = m)

    this.firstnameUnit = document.querySelector("#userFirstname")
    this.lastnameUnit = document.querySelector("#userLastname")
    this.nameUnit = document.querySelector("#userFullname")
    this.emailUnit = document.querySelector("#userEmail")
    this.genderUnit = document.querySelector("#userGender")
    this.statusUnit = document.querySelector("#userStatus")

    this.getSelectedUser()

  }

  // get the details of the user by selected Id 
  getSelectedUser() {
    this.http.get("https://gorest.co.in/public/v2/users/" + this.cOselectedId + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = data;

        const splitname = this.userData.name.split(" ")
        const lastname = splitname.pop()
        const firstname = splitname.join(" ")

        this.firstnameUnit.value = firstname;
        this.lastnameUnit.value = lastname;
        this.nameUnit.value = this.userData.name;
        this.emailUnit.value = this.userData.email;
        this.genderUnit.value = this.userData.gender;
        this.statusUnit.value = this.userData.status;
      })
  }

  // validation to update the user details in the correct formate
  upDateUser(id: number, data: any) {
    data.name = this.nameUnit.value;
    data.email = this.emailUnit.value;
    data.gender = this.genderUnit.value;
    data.status = this.statusUnit.value;
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
          } else { alert("Enter a valid email") }
        } else { alert("Enter active or inactive only in Status") }
      } else { alert("Enter male or female only in Gender") }
    } else { alert("Please fill all the user details") }
  }

  // Redirecting to userlist component on click to Userlist/back button in the navbar
  goToUserList() {
    this.route.navigate(["userlist"]);
  }

}
