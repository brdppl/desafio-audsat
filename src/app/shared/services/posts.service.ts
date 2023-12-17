import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserPost(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.baseUrl}/users/${id}/posts`);
  }
}
