import {Injectable} from '@angular/core';
import {environment} from "@cash-compass/environments";
import {HttpClient} from "@angular/common/http";
import {UserLoginDto} from "./data/user.model";

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserLoginDto) {
    console.log(user, 'is logging in.')
    return this.http.post(`${apiUrl}/auth/login`, user);
  }

  logout() {
    console.log('Logging out.');
    return this.http.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
  }
}
