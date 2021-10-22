import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

export interface UserCredentials {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: UserCredentials): Observable<string>{
    console.log(credentials);
    return this.httpClient.post<string>(environment.apiUrl + 'users/login/', credentials)
      .pipe(tap(token => console.log("TOKEN", token)));
  }
}
