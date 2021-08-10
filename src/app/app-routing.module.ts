import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermissionComponent } from './permission/permission.component';
import { AuthenticateGuard } from './shared/guards/authenticate.guard';
import { AuthorizeGuard } from './shared/guards/authorize.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticateGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: 'unauthorized',
        component: PermissionComponent,
      },
      {
        path: 'users',
        canActivate: [AuthorizeGuard],
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'feedbacks',
        loadChildren: () =>
          import('./modules/feedbacks/feedbacks.module').then(
            (m) => m.FeedbacksModule
          ),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
