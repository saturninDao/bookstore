import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { MyConfig } from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private myconfig:MyConfig) {
    const config = myconfig.firebaseConfigG;
    firebase.initializeApp(config);
  }
}
