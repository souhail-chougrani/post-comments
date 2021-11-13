import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Comment } from '../models/comment';
@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private firebase: AngularFirestore) { }

    addComment(comment: Partial<Comment>): Observable<any> {
        return from(this.firebase.collection('comments').add(comment));
    }

    getCommentsByPost(postId?: string): Observable<Partial<Comment>[]> {
        return this.firebase.collection<Partial<Comment>[]>('comments', ref => ref.where('post_id', '==', postId)
            .orderBy('createdAt', 'desc')).get()
            .pipe(
                map((comments) => comments.docs.map(c => {
                    const data = c.data();
                    const id = c.id;
                    return { id, ...data };
                })),
            );
    }
}