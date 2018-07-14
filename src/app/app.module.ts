import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { ProblemsService } from './services/problems/problems.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [
    ProblemsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
