import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { MaterialModule } from 'src/app/core/material.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PostAreaComponent } from './components/post-area/post-area.component';


@NgModule({
  declarations: [PostsComponent, UserDetailsComponent, PostAreaComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MaterialModule
  ]
})
export class PostsModule { }
