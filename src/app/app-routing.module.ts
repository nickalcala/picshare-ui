import {RouterModule, Routes} from '@angular/router';
import { NgModule } from "@angular/core";

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { PublicComponent } from './components/layouts/public.component';
import { LayoutComponent } from './components/layouts/layout.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PostPictureComponent } from './components/pictures/post-picture.component';

export const publicRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
];

export const securedRoutes: Routes = [
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'pictures/new',
        component: PostPictureComponent
    }
];

export const routes: Routes = [
    { path: '', component: LayoutComponent, children: securedRoutes, canActivate: [AuthGuard] },
    { path: '', component: PublicComponent, children: publicRoutes, canActivate: [GuestGuard] },
    { path: '**', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }