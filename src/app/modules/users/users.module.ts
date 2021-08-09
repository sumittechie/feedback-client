import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule } from '@angular/router';
import { ActionBarModule } from 'src/app/shared/components/action-bar/action-bar.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UsersComponent, ManageComponent],
  imports: [
    CommonModule,
    ActionBarModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
  ],
})
export class UsersModule {}
