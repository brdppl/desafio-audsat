import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../models/comment.model';
import { of } from 'rxjs';

const httpMock = {
  get: jest.fn(),
  delete: jest.fn()
};

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCommentsByPostId', () => {
    it('should create getCommentsByPostId http get method', () => {
      const res: IComment[] = [];
      jest.spyOn(httpMock, 'get').mockReturnValue(of(res));

      service.getCommentsByPostId(1).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('removeComment', () => {
    it('should create removeComment http delete method', () => {
      jest.spyOn(httpMock, 'delete').mockReturnValue(of({} as any));

      service.removeComment(1).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });
});
