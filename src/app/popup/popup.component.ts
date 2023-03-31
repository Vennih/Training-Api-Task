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

  fullNameFromFirstName: any="";
  fullNameFromLastName: any="";
  cOselectedId: any;
  
  nameUnit:any;
  emailUnit:any;
  genderUnit:any;
  statusUnit:any;

  constructor(private http: HttpClient, private route: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    this.fullName = document.querySelector("#inputFullName");
    this.commonService.commonMessage.subscribe(m => this.cOselectedId = m)

    this.nameUnit=document.querySelector("#inputFirstName")
    this.emailUnit=document.querySelector("#inputEmail")
    this.genderUnit=document.querySelector("#inputGender")
    this.statusUnit=document.querySelector("#inputStatus")

    this.getSelectedUser()

  }

  getSelectedUser() {
    this.http.get("https://gorest.co.in/public/v2/users/" + this.cOselectedId + "?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = data;
        this.nameUnit.value = this.userData.name;
        this.emailUnit.value = this.userData.email;
        this.genderUnit.value = this.userData.gender;
        this.statusUnit.value = this.userData.status;
      })
  }

  showFirstNameInFullName(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.fullNameFromFirstName = filvalue
    this.fullNameValue()
  }
  showLastNameInFullName(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.fullNameFromLastName = filvalue
    this.fullNameValue()
  }

  fullNameValue() {
    this.fullName.value = this.fullNameFromFirstName + " " + this.fullNameFromLastName;
  }

  upDateUser(id: number, data: any) {
    console.log(id)
    console.log(data)
    if(data.name.value != "" && data.email.value != "" && data.gender != "" && data.status.value != ""){
    this.http.put("https://gorest.co.in/public/v2/users/"+id+"?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525", data)
      .subscribe(res => {
        console.log(res)
        alert("User Details changed Successfully")
        this.route.navigate(['userlist'])
        window.location.reload()
      })
    console.log(data)
    }else{
      alert("Please fill all the user details")
    }

  }

}
