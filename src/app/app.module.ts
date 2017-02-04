import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs/rxjs-extensions';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AlertModule } from 'ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { RatingModule } from 'ng2-bootstrap/rating';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { PatternService } from './pattern.service';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AboutComponent } from './about/about.component';
import { CreateComponent } from './create/create.component';
import { BrowseComponent } from './browse/browse.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { PlayComponent } from './play/play.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AboutComponent,
    CreateComponent,
    BrowseComponent,
    SignUpComponent,
    LogInComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    RatingModule.forRoot(),
    TooltipModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [PatternService],
  bootstrap: [AppComponent]
})

export class AppModule { }
