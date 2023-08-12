import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuardGuard } from '@services/seguridad/auth-guard.guard';
import { AuthGuard } from 'app/auth/helpers';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { InstallComponent } from './install/install.component';
import { VersionsComponent } from './versions/versions.component';
import { MenuComponent } from './menu/menu.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { EventsComponent } from './events/events.component';


const routes = [
  {
    path: 'applications/install',
    component: InstallComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'install' }
  },
  {
    path: 'applications/versions',
    component: VersionsComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'versions' }
  },
  {
    path: 'applications/menu',
    component: MenuComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'menu' }
  },
  {
    path: 'applications/monitoring',
    component: MonitoringComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'monitoring' }
  },
  {
    path: 'applications/events',
    component: EventsComponent,
    // canActivate: [AuthGuard,AuthGuardGuard],
    canActivate: [AuthGuardGuard],
    data: { animation: 'events' }
  }
];


@NgModule({
  declarations: [
    InstallComponent,
    VersionsComponent,
    MenuComponent,
    MonitoringComponent,
    EventsComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ContentHeaderModule, TranslateModule, CoreCommonModule],
})
export class ApplicationsModule { }
