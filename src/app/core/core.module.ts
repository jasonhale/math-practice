import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemComponent } from './problem/problem.component';
import { SettingsComponent } from './settings/settings.component';
import { AnswermodalComponent } from './answermodal/answermodal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProblemComponent, SettingsComponent, AnswermodalComponent],
  exports: [
    ProblemComponent,
    SettingsComponent,
    AnswermodalComponent
  ]
})
export class CoreModule { }
