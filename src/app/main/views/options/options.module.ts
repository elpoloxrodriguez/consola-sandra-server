import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardGuard } from '@services/seguridad/auth-guard.guard';
import { AuthGuard } from 'app/auth/helpers';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { UpdateComponent } from './update/update.component';

const routes = [
  {
    path: 'options/update',
    component: UpdateComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'update' }
  }
];

@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class OptionsModule { }
