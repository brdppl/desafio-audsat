import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAreaComponent } from './post-area.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../../../core/material.module';
import posts from '../../../../../mocks/posts.json';
import comments from '../../../../../mocks/comments.json';
import { IPost } from '../../../../shared/models/post.model';
import { CommentsService } from '../../../../shared/services/comments.service';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IComment } from '../../../../shared/models/comment.model';
import { ErrorMsg, SuccessMsg } from '../../../../shared/models/messages.enum';

const postsMock: IPost[] = posts;
const commentsMock: IComment[] = comments;

describe('PostAreaComponent', () => {
  let component: PostAreaComponent;
  let fixture: ComponentFixture<PostAreaComponent>;
  let commentsService: CommentsService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostAreaComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule
      ]
    });
    commentsService = TestBed.inject(CommentsService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(PostAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleComment', () => {
    it('should show comments', () => {
      const obj = postsMock[0];
      obj.isShowingComments = false;
      jest.spyOn<PostAreaComponent, any>(component, 'getComments').mockImplementation();

      component.toggleComment(obj);

      expect(component['getComments']).toHaveBeenCalledWith(1);
    });
  });

  describe('removeComment', () => {
    const ev: MouseEvent = <MouseEvent>{
      preventDefault: () => {},
      stopPropagation: () => {}
    };
    const obj = postsMock[0];
    const index = 0;

    beforeEach(() => {
      component.posts = posts;
    });

    it('should remove comment with success', () => {
      jest.spyOn(commentsService, 'removeComment').mockReturnValue(of({} as any));
      jest.spyOn(snackBar, 'open').mockImplementation();

      component.removeComment(ev, obj, index);

      expect(component.posts).toHaveLength(2);
      expect(snackBar.open).toHaveBeenCalledWith(
        SuccessMsg.REMOVE_POST_SUCCESS,
        '',
        { duration: 5000 }
      );
    });

    it('should get error on remove comment', () => {
      jest.spyOn(commentsService, 'removeComment').mockReturnValue(throwError(() => null));
      jest.spyOn(snackBar, 'open').mockImplementation();

      component.removeComment(ev, obj, index);

      expect(component.posts).toHaveLength(2);
      expect(snackBar.open).toHaveBeenCalledWith(
        ErrorMsg.REMOVE_POST_ERROR,
        '',
        { duration: 5000 }
      );
    });
  });

  describe('getComments', () => {
    const id = 1;

    beforeEach(() => {
      component.posts = [{
        id: 1,
        userId: 1,
        body: 'b',
        title: 'a'
      }];
    });

    it('should fetch comments from api with success', () => {
      jest.spyOn(commentsService, 'getCommentsByPostId').mockReturnValue(of(commentsMock));
      component.posts[0].comments = commentsMock;
      
      component['getComments'](id);

      expect(commentsService.getCommentsByPostId).toHaveBeenCalledWith(id);
      expect(component.posts[0]).toHaveProperty('comments');
    });

    it('should get error on fetch comments from api', () => {
      jest.spyOn(commentsService, 'getCommentsByPostId').mockReturnValue(throwError(() => null));
      jest.spyOn(snackBar, 'open').mockImplementation();
      
      component['getComments'](id);

      expect(commentsService.getCommentsByPostId).toHaveBeenCalledWith(id);
      expect(snackBar.open).toHaveBeenCalledWith(
        ErrorMsg.LIST_COMMENTS_ERROR,
        '',
        { duration: 5000 }
      );
    });
  });
});
