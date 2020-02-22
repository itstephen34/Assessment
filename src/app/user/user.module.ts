import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { ConfirmBoxComponent } from '../shared/component/confirm-box/confirm-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { RoleComponent } from './role/role.component';


@NgModule({
  declarations: [UserComponent, RoleComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],

  entryComponents: [ConfirmBoxComponent]
})
export class UserModule { }
