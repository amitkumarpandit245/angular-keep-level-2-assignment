import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { RouterService } from '../services/router.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  userObj: User;
  submitMessage: string;
  constructor(private authservice: AuthenticationService, private routerservice: RouterService) {

    this.userObj = new User();
    this.submitMessage = '';
  }

  loginSubmit() {
    this.submitMessage = '';
    this.userObj.username = this.username.value;
    this.userObj.password = this.password.value;
    this.authservice.authenticateUser(this.userObj).subscribe(res => {
      this.authservice.setBearerToken(res['token']);
      this.routerservice.routeToDashboard();
    }, err => {
      this.submitMessage = err.message;
      if (err.status === 403) {
        this.submitMessage = 'Unauthorized';
      } else {
        this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
      }
    });
  }
}
