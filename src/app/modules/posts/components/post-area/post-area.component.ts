import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/shared/models/post.model';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'post-area',
  templateUrl: './post-area.component.html',
  styleUrls: ['./post-area.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.2s ease-out', 
                    style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: '*', opacity: 1 }),
            animate('0.2s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class PostAreaComponent implements OnDestroy {
  @Input() public posts: IPost[] = [];

  private subscriptions = new Subscription();

  constructor(
    private commentsService: CommentsService,
    private snackBar: MatSnackBar
  ) { }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();  
  }

  public toggleComment(post: IPost): void {
    const { id, isShowingComments } = post;
    post.isShowingComments = !post.isShowingComments;

    if (!isShowingComments) {
      this.getComments(id);
    }
  }

  public removeComment(ev: MouseEvent, { id }: IPost, index: number): void {
    ev.preventDefault();
    ev.stopPropagation();

    this.subscriptions.add(
      this.commentsService.removeComment(id).subscribe({
        next: () => {
          this.posts.splice(index, 1);
          this.snackBar.open('Post excluído com sucesso!', '', {
            duration: 5000
          });
        },
        error: () => {
          this.snackBar.open('Erro ao excluir o post', '', {
            duration: 5000
          });
        }
      })
    );
  }

  private getComments(id: number): void {
    this.subscriptions.add(
      this.commentsService.getCommentsByPostId(id).subscribe({
        next: data => {
          this.posts = this.posts.map(post => {
            if (data.find(comment => comment.postId)?.postId === post.id) {
              post.comments = data;
            }

            return post;
          });
        },
        error: () => {
          this.snackBar.open('Erro ao listar os comentários', '', {
            duration: 5000
          });
        }
      })
    );
  }
}
