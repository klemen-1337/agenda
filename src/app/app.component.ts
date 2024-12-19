import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { BucketListComponent } from './components/bucket-list/bucket-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, BucketListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agenda';
}
