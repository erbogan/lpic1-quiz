import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

import {HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { LernphasewahlenComponent } from './lernphasewahlen/lernphasewahlen.component';




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    QuestionComponent,
    LernphasewahlenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
