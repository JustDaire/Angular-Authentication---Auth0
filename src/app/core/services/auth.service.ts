import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import createAuth0Client from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // auth0: any;
  requestedScopes: string = 'openid profile read:timesheets create:timesheets';

  auth0 = new auth0.WebAuth({
    clientID: 'pbWYl8vB67EWIQYQcrxndQooeh05Mg8o',
    domain: 'dev-mjy2t837.us.auth0.com',
    responseType: 'token id_token',
    audience: 'https://dev-mjy2t837.us.auth0.com/api/v2/',
    // audience: 'https://handheld.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200',
    // scope: 'openid email user_metadata'
    scope: this.requestedScopes
  });

  // https://auth0.com/docs/get-started/apis/scopes

  constructor() {
  }

  login() {
    console.log('Logging in');
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        // this.router.navigate(['/home']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.error(err);
        alert('Error: <%= "${err.error}" %>. Check the console for further details.');
      }
    });
  }

  // @ts-ignore
  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    console.log('Session set');
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the Access.
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  logOut() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
  }
}
