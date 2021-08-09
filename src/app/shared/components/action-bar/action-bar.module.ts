import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActionBarComponent } from './action-bar.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
})
export class ActionBarModule {}
