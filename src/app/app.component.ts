import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'shoplist';
  // loadedfeature='Recipe';
  // OnNavigate(feature: string){
  //   this.loadedfeature=feature;
  //   //console.log(this.loadedfeature);
  // }
  addPadding: any
  constructor(private authservice: AuthService) { }
  ngOnInit() {
    this.authservice.autoLogin();
  }
  addPaddingtobody($event) {
    if ($event) {
      this.addPadding = $event;
    }
    else {
      setTimeout(() => {
        this.addPadding = $event;
      }, 200)
    }
  }
}
