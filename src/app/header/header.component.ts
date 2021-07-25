import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../share/data-storage.service';
@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() event = new EventEmitter<boolean>();
  isAuthenticated = false;
  public navbarCollapsed = true;
  public addPaddingtobody = false;
  private userSub: Subscription;
  constructor(private dataStorage: DataStorageService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }
  OnSavingData() {
    this.dataStorage.storeRecipes();
  }
  LogOut() {
    this.authservice.logOut();
  }
  OnFetchingRecipes() {
    this.dataStorage.fetchRecipes().subscribe();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onClick() {
    this.addPaddingtobody = !this.addPaddingtobody;
    this.event.emit(this.addPaddingtobody)
  }
}