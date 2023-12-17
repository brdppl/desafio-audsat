import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { of } from 'rxjs';

const httpMock = {
  get: jest.fn()
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should create getUsers http get method', () => {
      const res: IUser[] = [];
      jest.spyOn(httpMock, 'get').mockReturnValue(of(res));

      service.getUsers().subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('getUserById', () => {
    it('should create getUserById http get method', () => {
      const res: IUser[] = [];
      jest.spyOn(httpMock, 'get').mockReturnValue(of(res));

      service.getUserById(1).subscribe(data => {
        expect(data).toBeDefined();
      });
    });
  });
});
