import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ManageComponent } from './manage/manage.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersComponent, ManageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
  ],
})
export class UsersModule {}
