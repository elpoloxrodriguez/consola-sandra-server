import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardGuard } from '@services/seguridad/auth-guard.guard';
import { AuthGuard } from 'app/auth/helpers';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { RoleComponent } from './role/role.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';

const routes = [
  {
    path: 'security/role',
    component: RoleComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'role' }
  },
  {
    path: 'security/profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'profile' }
  },
  {
    path: 'security/user',
    component: UserComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'user' }
  }
];


@NgModule({
  declarations: [
    RoleComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class SecurityModule { }
