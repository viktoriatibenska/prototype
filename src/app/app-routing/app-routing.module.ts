import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from '../browse/browse.component';
import { CreateComponent } from '../create/create.component';
import { AboutComponent } from '../about/about.component';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

const routes: Routes = [
    {
        path: 'browse',
        component: BrowseComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LogInComponent
    },
    {
        path: '',
        redirectTo: '/browse',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/browse',
        pathMatch: 'full'
    },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
