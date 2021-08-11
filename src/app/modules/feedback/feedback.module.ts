import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ActionBarModule } from 'src/app/shared/components/action-bar/action-bar.module';

@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ActionBarModule,
    RouterModule.forChild([{ path: '', component: FeedbackComponent }]),
  ],
})
export class FeedbackModule {}
