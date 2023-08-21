import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

import { LearnphaseComponent } from './learnphase/learnphase.component';
import { CheckComponent } from './check/check.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'check', component: CheckComponent },
  { path: 'learn', component: LearnphaseComponent },
  { path: 'result', component: ResultComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
