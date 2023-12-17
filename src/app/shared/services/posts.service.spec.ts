import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IPost } from '../models/post.model';
import { of } from 'rxjs';

const httpMock = {
  get: jest.fn()
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserPost', () => {
    it('should create getUserPost http get method', () => {
      const res: IPost[] = [];
      jest.spyOn(httpMock, 'get').mockReturnValue(of(res));

      service.getUserPost(1).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });
});
