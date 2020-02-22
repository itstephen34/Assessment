import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  { path: '', component: AddLeaveTypeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'manage-leave', canActivate:[AuthGuard], component: LeaveComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
