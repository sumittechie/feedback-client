import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [HeaderComponent, SpinnerComponent]
})
export class ComponentsModule { }
