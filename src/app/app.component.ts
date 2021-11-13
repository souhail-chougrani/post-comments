import { Component } from '@angular/core';
import { SeedDbService } from './ceed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'post-comments';
  constructor(private seedService: SeedDbService) {
    this.seedService.seed();
  }
}
