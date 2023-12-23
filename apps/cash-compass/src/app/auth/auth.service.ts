import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLoginDto, UserProfile} from "./data/user.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import { environment } from "../../environments/environment";

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$: Observable<UserProfile | null> = this.userProfileSubject.asObservable();

  constructor(private http: HttpClient) { }


  login(user: UserLoginDto): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${apiUrl}/auth/login`, user).pipe(
      tap((profile) => this.userProfileSubject.next(profile))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${apiUrl}/auth/logout`, {}).pipe(
      tap(() => this.userProfileSubject.next(null))
    );
  }
}
