import { HttpModule, Http, XHRBackend, RequestOptions, ResponseOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpFactory } from './factories/http.factory';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FileUploadModule } from 'ng2-file-upload';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { SessionService } from './services/session.service';
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';
import { PictureService } from './services/picture.service';

import { HeaderComponent } from './components/layouts/header.component';
import { LayoutComponent } from './components/layouts/layout.component';
import { PublicComponent } from './components/layouts/public.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PostPictureComponent } from './components/pictures/post-picture.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    LayoutComponent,
    PublicComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    PostPictureComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FileUploadModule,
    LocalStorageModule.withConfig({
      prefix: 'picshare',
      storageType: 'localStorage'
    })
  ],
  providers: [
    AuthGuard,
    GuestGuard,

    SessionService,
    LoginService,
    StorageService,
    PictureService,
    UserService,

    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        ResponseOptions,
        SessionService
      ]
    }
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
