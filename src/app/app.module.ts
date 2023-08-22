import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {HttpClientModule } from '@angular/common/http';
import { LearnphaseComponent } from './learnphase/learnphase.component';
import { CheckComponent } from './check/check.component';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    LearnphaseComponent,
    WelcomeComponent,
    CheckComponent,
    ResultComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
