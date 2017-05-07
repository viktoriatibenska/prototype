import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs/rxjs-extensions';

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
import { DesignComponent } from './design/design.component';
import { LogInComponent } from './log-in/log-in.component';
import { PlayComponent } from './play/play.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AboutComponent,
    CreateComponent,
    BrowseComponent,
    DesignComponent,
    LogInComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    AccordionModule.forRoot(),
    RatingModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [PatternService],
  bootstrap: [AppComponent]
})

export class AppModule { }
