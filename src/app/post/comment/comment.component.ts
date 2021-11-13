import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import * as moment from 'moment';
import firebase from 'firebase';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],

})
export class CommentComponent implements OnInit {
  @Input()
  comment: Partial<Comment>;
  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date): any {
    date = date.seconds ? date.seconds : new Date().getTime() / 1000;
    return moment.unix(date).fromNow();
  }

}
