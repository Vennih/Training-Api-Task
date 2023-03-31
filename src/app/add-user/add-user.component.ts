import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  // AddUser: any;
  userData: any;
  fullName: any;

  fullNameFromFirstName: any = "";
  fullNameFromLastName: any = "";
  firstNameInput: any;
  lastNameInput: any;
  nameText: any;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

    this.fullName = document.querySelector("#inputFullName4");
    // this.firstNameInput = document.querySelector("#inputFirstName4");
    // console.log(this.firstNameInput)
    // this.lastNameInput = document.querySelector("#inputLastName4")

    // // this.firstNameInput.addEventListener("input", this.updateFullName);
    // // this.lastNameInput.addEventListener("input", this.updateFullName);
    // this.updateFullName()

  }
  // updateFullName() {
  //   const firstName = this.firstNameInput.value;
  //   const lastName = this.lastNameInput.value;
  //   let nameText: string = firstName + " " + lastName;
  //   this.fullName = nameText

  // }

  AddUser(data: any) {
    console.log(data)
    if (data.name != "" && data.email != "" && data.gender != "" && data.status != "") {
      this.http.post("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525", data)
        .subscribe(res => {
          console.log(res)
          alert("User Details Added Successfully")
          this.route.navigate(['userlist'])
        })
      console.log(data)
    } else {
      alert("Please fill all the user details")
    }
  }

  goToUserList() {
    this.route.navigate(["userlist"]);
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
    console.log(this.fullName.value)
  }

}
