import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

// Import the module from the SDK
import {AuthModule} from '@auth0/auth0-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './parts/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
    imports: [
        BrowserModule,

        // Import the module into the application, with configuration
        AuthModule.forRoot({
            domain: 'dev-mjy2t837.us.auth0.com',
            clientId: 'pbWYl8vB67EWIQYQcrxndQooeh05Mg8o'
        }),
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        BsDropdownModule,
    ],
  providers: [],
  exports: [
    MatIconModule,
    MatToolbarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
