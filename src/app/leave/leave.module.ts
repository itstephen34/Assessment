import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { LeaveRoutingModule } from './leave-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxComponent } from '../shared/component/confirm-box/confirm-box.component';
import { SharedModule } from '../shared/shared.module';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [AddLeaveTypeComponent, LeaveComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeaveRoutingModule,
    NgbModule,
    SharedModule
    ],
    entryComponents: [ConfirmBoxComponent]
})
export class LeaveModule { }
