import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';

// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


const AngularMaterialModules = [MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [
    PostComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    ...AngularMaterialModules
  ]
})
export class PostModule { }
