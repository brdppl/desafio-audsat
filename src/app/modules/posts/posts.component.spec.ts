import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../core/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostsService } from '../../shared/services/posts.service';
import { of, throwError } from 'rxjs';
import posts from '../../../mocks/posts.json';
import users from '../../../mocks/users.json';
import { IPost } from '../../shared/models/post.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../shared/services/users.service';
import { IUser } from '../../shared/models/user.model';

const postsMock: IPost[] = posts;
const usersMock: IUser[] = users;

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;
  let usersService: UsersService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });
    postsService = TestBed.inject(PostsService);
    usersService = TestBed.inject(UsersService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should fetch posts from api with success', () => {
      jest.spyOn(postsService, 'getUserPost').mockReturnValue(of(postsMock));

      component['getPosts']();

      expect(postsService.getUserPost).toHaveBeenCalled();
    });

    it('should get error on fetch posts from api', () => {
      jest.spyOn(postsService, 'getUserPost').mockReturnValue(throwError(() => null));
      jest.spyOn(snackBar, 'open').mockImplementation();

      component['getPosts']();

      expect(postsService.getUserPost).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith(
        'Erro ao listar os posts',
        '',
        { duration: 5000 }
      );
    });
  });

  describe('getUserData', () => {
    it('should fetch user data from api with success', () => {
      jest.spyOn(usersService, 'getUserById').mockReturnValue(of(usersMock[0]));

      component['getUserData']();

      expect(usersService.getUserById).toHaveBeenCalled();
    });

    it('should get error on fetch user data from api', () => {
      jest.spyOn(usersService, 'getUserById').mockReturnValue(throwError(() => null));
      jest.spyOn(snackBar, 'open').mockImplementation();

      component['getUserData']();

      expect(usersService.getUserById).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith(
        'Erro ao buscar os dados do usuário',
        '',
        { duration: 5000 }
      );
    });
  });
});
