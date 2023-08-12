import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardGuard } from '@services/seguridad/auth-guard.guard';
import { AuthGuard } from 'app/auth/helpers';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { CommunicationsComponent } from './communications/communications.component';
import { ConnectionsComponent } from './connections/connections.component';
import { MonitoringComponent } from './monitoring/monitoring.component';

const routes = [
  {
    path: 'networks/communications',
    component: CommunicationsComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'communications' }
  },
  {
    path: 'networks/connections',
    component: ConnectionsComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'connections' }
  },
  {
    path: 'networks/monitoring',
    component: MonitoringComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'monitoring' }
  }
];


@NgModule({
  declarations: [
    CommunicationsComponent,
    ConnectionsComponent,
    MonitoringComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class NetworksModule { }
