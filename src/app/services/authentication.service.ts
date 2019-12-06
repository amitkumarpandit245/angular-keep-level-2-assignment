import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthenticationService {
<<<<<<< HEAD
  private authUrl: string;
  constructor(private httpclient: HttpClient) {
    this.authUrl = 'http://localhost:3000/auth/v1/';
=======

  private authUrl:string;
  constructor(private httpclient:HttpClient) 
  { 
    this.authUrl="http://localhost:3000/auth/v1/";
>>>>>>> 86003c8628e4b921c85994b59f02f65eab493bd9
  }
  authenticateUser(data) {
    return this.httpclient.post(this.authUrl, data);
  }
  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }
  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }
  isUserAuthenticated(token): Promise<boolean> {
    return this.httpclient.post(`${this.authUrl}/isAuthenticated`, {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      map((res) => res['isAuthenticated']))
      .toPromise();
  }
}
