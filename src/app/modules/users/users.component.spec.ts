import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../core/material.module';

import { UsersComponent } from './users.component';
import { UsersService } from '../../shared/services/users.service';
import { of, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import users from '../../../mocks/users.json';
import { MatSnackBar } from '@angular/material/snack-bar';

const usersMock: IUser[] = users;

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersService: UsersService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
      ]
    });
    usersService = TestBed.inject(UsersService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should fetch users from api with success', () => {
      jest.spyOn(usersService, 'getUsers').mockReturnValue(of(usersMock));
      
      component['getUsers']();

      expect(usersService.getUsers).toHaveBeenCalled();
    });

    it('should get error on fetch users from api', () => {
      jest.spyOn(usersService, 'getUsers').mockReturnValue(throwError(() => null));
      jest.spyOn(snackBar, 'open').mockImplementation();

      component['getUsers']();

      expect(usersService.getUsers).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
