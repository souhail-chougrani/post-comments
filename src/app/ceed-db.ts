import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

const content = `Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
`;

@Injectable({ providedIn: 'root' })
export class SeedDbService {
    constructor(private afs: AngularFirestore) { }


    seed(): void {
        from(this.afs.collection('posts').doc('pYkS5eOPQFcwZ3aVzMsO').get())
            .pipe(tap(doc => {
                if (!doc.exists) {
                    this.afs.collection('posts')
                        .doc('pYkS5eOPQFcwZ3aVzMsO')
                        .set({ comment_ids: [], createdAt: new Date(), post_body: content, title: 'title post', postedBy: 'Souhail' });
                }
            })).pipe(
                concatMap(() => from(this.afs.collection('comments').doc('5kNP5jCAQjCT8QyZmCs4').get())
                    .pipe(tap(doc => {
                        if (!doc.exists) {
                            this.afs.collection('comments')
                                .doc('5kNP5jCAQjCT8QyZmCs4')
                                .set({ comment: '', createdAt: new Date(), post_id: 'pYkS5eOPQFcwZ3aVzMsO', user_name: 'Mr Nobody' });
                        }
                    })))
            ).subscribe();
    }
}
