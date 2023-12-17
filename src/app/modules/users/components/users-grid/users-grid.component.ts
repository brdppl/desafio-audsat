import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IUser } from '../../../../shared/models/user.model';
import { UsersGridColumns } from '../../../../shared/models/users-grid-columns.enum';

@Component({
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss']
})
export class UsersGridComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @Input() public data: IUser[] = [];

  public columns = UsersGridColumns;

  public displayedColumns: string[] = [
    UsersGridColumns.NAME,
    UsersGridColumns.USERNAME,
    UsersGridColumns.EMAIL,
    UsersGridColumns.PHONE,
    UsersGridColumns.DETAILS
  ];
  public dataSource = new MatTableDataSource<IUser>();

  constructor(
    private router: Router
  ) { }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  public userDetails({ id }: IUser) {
    this.router.navigateByUrl(`user/${id}/posts`);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
