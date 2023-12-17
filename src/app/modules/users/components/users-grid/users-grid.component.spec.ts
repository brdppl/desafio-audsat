import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGridComponent } from './users-grid.component';
import { MaterialModule } from '../../../../core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IUser } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { MatTableDataSourcePaginator } from '@angular/material/table';

describe('UsersGridComponent', () => {
  let component: UsersGridComponent;
  let fixture: ComponentFixture<UsersGridComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersGridComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
      ]
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UsersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should detect changes', () => {
      const changes: any = {
        data: {
          currentValue: []
        }
      };

      component.ngOnChanges(changes);

      expect(component.dataSource.data).toEqual(changes.data.currentValue);
    });
  });

  describe('userDetails', () => {
    it('should navigate to posts', () => {
      const user: IUser = <IUser>{
        id: 1
      };
      jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

      component.userDetails(user);

      expect(router.navigateByUrl).toHaveBeenCalledWith('user/1/posts');
    });
  });

  describe('applyFilter', () => {
    it('should apply filters', () => {
      const event: any = {
        target: {
          value: 'some words'
        }
      };
      component.dataSource.paginator = <MatTableDataSourcePaginator>{
        pageIndex: 0,
        firstPage: () => {}
      };

      component.applyFilter(event);

      expect(component.dataSource.paginator.pageIndex).toEqual(0);
    });
  });
});
