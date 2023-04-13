import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  firstnameInput: any;
  lastnameInput: any;
  regex: any = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

    this.firstnameInput = document.querySelector("#inputFirstName4")
    this.lastnameInput = document.querySelector("#inputLastName4")

  }

  // To display the fullname input by concate the firstname and lastname
  get fullname(): string {
    const name = this.firstnameInput.value + ' ' + this.lastnameInput.value;
    return name
  }


  // validation to add the user details in correct formate
  AddUser(data: any) {
    data.name = this.firstnameInput.value + " " + this.lastnameInput.value;
    if (data.name != "" && data.email != "" && data.gender != "" && data.status != "") {
      if (data.gender == 'male' || data.gender == 'female') {
        if (data.status == 'active' || data.status == 'inactive') {
          if (this.regex.test(data.email)) {
            this.http.post("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525", data)
              .subscribe(res => {
                console.log(res)
                alert("User Details Added Successfully")
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
