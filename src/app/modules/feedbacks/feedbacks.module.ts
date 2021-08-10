import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksComponent } from './feedbacks.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ActionBarModule } from 'src/app/shared/components/action-bar/action-bar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RepliesComponent } from './replies/replies.component';

@NgModule({
  declarations: [FeedbacksComponent, ManageComponent, RepliesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ActionBarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: FeedbacksComponent },
      { path: 'replies/:id', component: RepliesComponent },
    ]),
  ],
  providers: [],
})
export class FeedbacksModule {}
