import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-view-popup',
  templateUrl: './view-popup.component.html',
  styleUrls: ['./view-popup.component.css']
})
export class ViewPopupComponent implements OnInit {

  userData: any;
  fullName: any;

  cOselectedId: any;

  nameUnit: any;
  emailUnit: any;
  genderUnit: any;
  statusUnit: any;
  idUnit: any;

  gender: string = ""
  firstnameUnit: any;
  lastnameUnit: any;

  constructor(private http: HttpClient, private route: Router, private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.commonMessage.subscribe(m => this.cOselectedId = m)

    
    this.idUnit = document.querySelector("#userid")
    this.firstnameUnit = document.querySelector("#userfirstname")
    this.lastnameUnit = document.querySelector("#userlastname")
    this.nameUnit = document.querySelector("#username")
    this.emailUnit = document.querySelector("#useremail")
    this.genderUnit = document.querySelector("#usergender")
    this.statusUnit = document.querySelector("#userstatus")

    this.getSelectedUser()
    
    // this.gender = this.userData.gender;

  }

  getSelectedUser() {
    this.http.get("https://gorest.co.in/public/v2/users/" + this.cOselectedId + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = data;

        console.log(this.userData.name)
        const splitname = this.userData.name.split(" ")
        const lastname = splitname.pop()
        const firstname = splitname.join(" ")

        this.idUnit.value = this.userData.id
        this.firstnameUnit.value = firstname
        this.lastnameUnit.value = lastname
        this.nameUnit.value = this.userData.name;
        this.emailUnit.value = this.userData.email;
        this.genderUnit.value = this.userData.gender;
        this.statusUnit.value = this.userData.status;
      })
  }
  goToUserList() {
    this.route.navigate(["userlist"]);
  }
}
