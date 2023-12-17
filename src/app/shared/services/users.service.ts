import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.baseUrl}/users`);
  }

  public getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.baseUrl}/users/${id}`);
  }
}
