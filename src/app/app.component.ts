import { AuthService } from './auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private token: any;
  constructor() {
  }
  title = 'editProfileAngular';
}
