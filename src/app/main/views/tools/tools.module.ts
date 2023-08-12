import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardGuard } from '@services/seguridad/auth-guard.guard';
import { AuthGuard } from 'app/auth/helpers';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { FunctionsComponent } from './functions/functions.component';
import { ApiComponent } from './api/api.component';
import { WorkflowComponent } from './workflow/workflow.component';


const routes = [
  {
    path: 'tools/functions',
    component: FunctionsComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'functions' }
  },
  {
    path: 'tools/api',
    component: ApiComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'api' }
  },
  {
    path: 'tools/workflow',
    component: WorkflowComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'workflow' }
  }
];

@NgModule({
  declarations: [
    FunctionsComponent,
    // ApiComponent,
    WorkflowComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class ToolsModule { }
