import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as firestore from 'firebase/app';
import { Post } from '../models/post';
const uid = 'pYkS5eOPQFcwZ3aVzMsO'
@Injectable({ providedIn: 'root' })
export class PostService {
    constructor(private firebase: AngularFirestore) { }

    getPost(postId?: string): Observable<any> {
        return this.firebase.collection<Post>('post').doc(uid).valueChanges();
    }

}
