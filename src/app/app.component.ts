import { Component } from '@angular/core';
import { Problem } from './core/models/problem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showModal = false;
  probs = Array<Problem>();
}
