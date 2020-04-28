import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { MissingRouteComponent } from './modules/missing-route/missing-route.component';
import { ProcessHubstaffTimesheetComponent } from './modules/process-hubstaff-timesheet/process-hubstaff-timesheet.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'timesheet',
        component: ProcessHubstaffTimesheetComponent,
      },
      {
        path: '**',
        component: MissingRouteComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
