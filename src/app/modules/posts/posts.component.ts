import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { IPost } from '../../shared/models/post.model';
import { IUser } from '../../shared/models/user.model';
import { PostsService } from '../../shared/services/posts.service';
import { UsersService } from '../../shared/services/users.service';
import { ErrorMsg } from '../../shared/models/messages.enum';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts: IPost[] = [];
  public user: IUser = <IUser>{};

  private subscriptions = new Subscription();

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.getPosts();
    this.getUserData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getPosts(): void {
    this.subscriptions.add(
      this.route.params.pipe(
        switchMap(params => {
          const { id } = params;
          return this.postsService.getUserPost(Number(id));
        })
      ).subscribe({
        next: data => {
          this.posts = data;
        },
        error: () => {
          this.snackBar.open(ErrorMsg.LIST_POSTS_ERROR, '', {
            duration: 5000
          });
        }
      })
    );
  }

  private getUserData(): void {
    this.subscriptions.add(
      this.route.params.pipe(
        switchMap(params => {
          const { id } = params;
          return this.usersService.getUserById(id);
        })
      ).subscribe({
        next: data => {
          this.user = data;
        },
        error: () => {
          this.snackBar.open(ErrorMsg.GET_USER_DATA_ERROR, '', {
            duration: 5000
          });
        }
      })
    );
  }
}
