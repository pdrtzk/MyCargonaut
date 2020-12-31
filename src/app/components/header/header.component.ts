import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  userLoggedIn = false; // todo: get actual login status in ngOnInit
  navbarOpen = false;


  constructor() { }

  ngOnInit(): void {
  }


  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
  }

}
