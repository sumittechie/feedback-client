import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksComponent } from './feedbacks.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { ActionBarModule } from 'src/app/shared/components/action-bar/action-bar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FeedbacksComponent, ManageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ActionBarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild([
      { path: '', component: FeedbacksComponent },
      { path: 'manage/:id', component: ManageComponent },
    ]),
  ],
  providers: [],
})
export class FeedbacksModule {}
