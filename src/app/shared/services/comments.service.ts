import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  public getCommentsByPostId(id: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${environment.baseUrl}/posts/${id}/comments`);
  }

  public removeComment(id: number): Observable<object> {
    return this.http.delete<object>(`${environment.baseUrl}/posts/${id}`);
  }
}
