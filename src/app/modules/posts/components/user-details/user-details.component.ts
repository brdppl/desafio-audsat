import { Component, Input } from '@angular/core';
import { IUser } from '../../../../shared/models/user.model';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() public user: IUser = <IUser>{};
}
