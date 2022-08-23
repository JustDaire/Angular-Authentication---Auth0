import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  requestedScopes: string = 'openid profile email user_metadata read:timesheets create:timesheets';

  auth0 = new auth0.WebAuth({
    clientID: environment.AUTH0_CLIENT_ID,
    domain: environment.AUTH0_DOMAIN,
    responseType: 'token id_token',
    audience: '',
    redirectUri: 'http://localhost:4200',
    scope: this.requestedScopes
  });

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
        this.setSession({authResult: authResult});
        // this.router.navigate(['/home']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.error(err);
        alert(`Error: "${err.error}". Check the console for further details.`);
      }
    });
  }

  private setSession({authResult}: { authResult: any }): void {
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
