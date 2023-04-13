import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: any;
  emailList: any = [];

  inputEmail: any;
  findId: any;
  inputPassword: any;
  checkEmail: any;

  constructor(private http: HttpClient, private route: Router) {
  }
  ngOnInit(): void {
    this.inputEmail = document.querySelector("#inputEmail3");
    this.inputPassword = document.querySelector("#inputPassword3");

  }

  // function to check the user email and password to get login
  goToUserList() {

    // get all user details
    this.http.get("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = Object.values(data);

        // get array of all emails of the user
        this.emailList = this.userData.map((x: { email: any; }) => x.email)

        // check the email entered is available in the array of emails of the user
        this.checkEmail = this.emailList.includes(this.inputEmail.value);

        // get the id of email entered in the input field
        this.userData.filter((x: any) => {
          if (this.inputEmail.value == x.email) {
            return this.findId = x.id
          } else {
            console.log("Invalid Email")
          }
        })

        // validation for login
        if(this.inputEmail.value != "" && this.inputPassword.value != ""){
          if(this.checkEmail){
            if(this.findId == this.inputPassword.value){
              this.route.navigate(['userlist'])
            }else{alert("Password mismatched")}
          }else{alert("Wrong email/User email mismatched");this.route.navigate(['login'])}
        }else{alert("Please enter email and password");this.route.navigate(['login'])}
      })

      
  }

}
