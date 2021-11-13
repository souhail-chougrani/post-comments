import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { shareReplay, tap } from 'rxjs/operators';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { generateName } from '../utils';
import { rowsAnimation } from './animation';
import { InstantlyErrorStateMatcher } from './materState';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rowsAnimation]
})
export class PostComponent implements OnInit {

  displayMore = true;
  commentForm = new FormControl(null, [Validators.required, Validators.maxLength(10000)]);
  matcher = new InstantlyErrorStateMatcher();

  postId = 'pYkS5eOPQFcwZ3aVzMsO';
  comments: Partial<Comment>[];
  constructor(private commentService: CommentService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.commentService.getCommentsByPost(this.postId).pipe(shareReplay(1),
      tap(comments => {
        this.comments = comments;
        this.cd.markForCheck();
      })
    ).subscribe();
  }

  addComment(): void {
    const comment: Partial<Comment> =
      { user_name: generateName(), createdAt: new Date(), comment: this.commentForm.value, post_id: this.postId }
    if (this.commentForm.valid) {
      this.commentService.addComment(comment)
        .pipe(tap(_ => {
          this.commentForm.reset();
          this.comments = [comment, ...this.comments];
          this.cd.markForCheck();
        }),
        ).subscribe();
      ;
    }
  }

  display(): void {
    this.displayMore = !this.displayMore;
    this.commentService.getCommentsByPost(this.postId).subscribe();
  }

}

