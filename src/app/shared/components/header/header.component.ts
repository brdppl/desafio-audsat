import { Component } from '@angular/core';
import { IRoute } from '../../models/route.model';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public routes: IRoute[] = [
    {
      name: 'Home',
      route: '/home'
    },
    {
      name: 'Usuários',
      route: '/users'
    }
  ];
}
