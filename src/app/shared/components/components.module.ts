import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MaterialModule } from '../material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    NavigationComponent,
    ConfirmComponent,
  ],
  imports: [CommonModule, NgxSpinnerModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, SpinnerComponent, NavigationComponent],
})
export class ComponentsModule {}
