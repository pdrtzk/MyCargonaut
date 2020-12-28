import { Component, OnInit } from '@angular/core';
import {Cargonaut} from '../../shared/cargonaut.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: Cargonaut;

  constructor(/*private accountService: AccountService*/) {
    this.user = {firstname: 'Dieter'}; // this.accountService.userValue;
  }
}
