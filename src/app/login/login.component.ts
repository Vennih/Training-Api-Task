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
  emailList: any;

  inputEmail: any;
  findId: any;
  inputPassword: any;

  checkEmail: any;

  constructor(private http: HttpClient, private route: Router) {
    this.userData = [];
  }
  ngOnInit(): void {
    this.inputEmail = document.querySelector("#inputEmail3");
    this.inputPassword = document.querySelector("#inputPassword3");

  }

  goToUserList() {
    this.http.get("https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525")
      .subscribe((data: any) => {
        this.userData = Object.values(data);
        this.emailList = this.userData.map((x: { email: any; }) => x.email)
        // console.log(this.emailList);

        this.userData.filter((x: any) => {
          if (this.inputEmail.value == x.email) {
            return this.findId = x.id
          } else {
            console.log("Invalid Email")
          }
        })
        // console.log(this.findId)

        this.checkEmail = this.emailList.includes(this.inputEmail.value);
        // console.log(this.checkEmail)

        if (this.checkEmail && (this.findId == this.inputPassword.value)) {
          this.route.navigate(['userlist'])
        } else {
          alert("Invalid Email or Password")
          console.log("Wrong data")
          this.route.navigate(['login'])
        }
      })
  }

}
