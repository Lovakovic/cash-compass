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
    return this.http.post(`${apiUrl}/auth/login`, user);
  }

  logout() {
    return this.http.post(`${apiUrl}/auth/logout`, {});
  }
}
