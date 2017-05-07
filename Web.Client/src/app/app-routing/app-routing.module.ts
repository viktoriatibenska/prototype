import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseComponent } from '../browse/browse.component';
import { CreateComponent } from '../create/create.component';
import { AboutComponent } from '../about/about.component';
import { LogInComponent } from '../log-in/log-in.component';
import { DesignComponent } from '../design/design.component';
import { PlayComponent } from '../play/play.component';

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
        path: 'create/:id',
        component: CreateComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'design',
        component: DesignComponent
    },
    {
        path: 'login',
        component: LogInComponent
    },
    {
        path: 'play/:stateId',
        component: PlayComponent
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
