import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IUser } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public data: IUser[] = [];

  private subscriptions = new Subscription();

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getUsers(): void {
    this.subscriptions.add(
      this.usersService.getUsers().subscribe({
        next: data => {
          this.data = data;
        },
        error: () => {
          this.snackBar.open('Não foi possível carregar os usuários', '', {
            duration: 5000
          });
        }
      })
    );
  }
}
