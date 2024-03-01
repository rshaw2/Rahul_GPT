
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule
  ],
  exports: [
    BrowserModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfigService) => () => {
        return appConfig.load();
      },
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
