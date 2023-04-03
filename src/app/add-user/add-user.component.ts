import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  firstnameInput: string = "";
  lastnameInput: string = "";
  regex: any = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

  }

  get fullname(): string {
    const name = this.model.firstname + ' ' + this.model.lastname;
    return name
  }

  model = {
    firstname: '',
    lastname: '',
    name: ''
  }


  AddUser(data: any) {
    console.log(data);
    data.name = this.model.firstname + " " + this.model.lastname;
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
