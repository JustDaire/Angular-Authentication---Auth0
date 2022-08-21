import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  auth0 = null;

  fetchAuthConfig = () => fetch("src/auth_config.json");

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
  ) {
    auth.handleAuthentication();
    console.log('fetchAuthConfig', this.fetchAuthConfig);
  }

  ngOnInit() {
    console.log('Logged in:', this.auth.isAuthenticated());
  }

  logIn() {
    this.auth.login();

  }

  login() {
    this.auth.login();
  }
}
