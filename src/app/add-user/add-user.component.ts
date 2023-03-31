import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userData: any;
  fullName: any;

  fullNameFromFirstName: any = "";
  fullNameFromLastName: any = "";
  firstNameInput: any;
  lastNameInput: any;
  regex:any = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

    this.fullName = document.querySelector("#inputFullName4");

  }

  AddUser(data: any) {
    console.log(data)
    if (data.name != "" && data.email != "" && data.gender != "" && data.status != "") {
      if (data.gender == 'male' || data.gender == 'female') {
        if (data.status == 'active' || data.status == 'inactive') {
          if(this.regex.test(data.email)){
          this.http.post("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525", data)
            .subscribe(res => {
              console.log(res)
              alert("User Details Added Successfully")
              this.route.navigate(['userlist'])
            })
          console.log(data)
          }else { alert("Enter a valid email") }
        } else { alert("Enter active or inactive only in Status") }
      } else { alert("Enter male or female only in Gender") }
    } else { alert("Please fill all the user details") }
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
