import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { ProcessHubstaffTimesheetComponent } from 'src/app/modules/process-hubstaff-timesheet/process-hubstaff-timesheet.component';
import { MissingRouteComponent } from 'src/app/modules/missing-route/missing-route.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ProcessHubstaffTimesheetComponent,
    MissingRouteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatDividerModule,
    MatSidenavModule,
    FlexLayoutModule,
  ],
  providers: [
     DashboardService,
  ]
})
export class DefaultModule { }
