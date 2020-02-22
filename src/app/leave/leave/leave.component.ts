import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/user/user/srvice/user.service';
import { NgbAlertConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from 'src/app/user/role/service/roles.service';
import { ConfirmBoxComponent } from 'src/app/shared/component/confirm-box/confirm-box.component';
import { AddLeaveTypeService } from '../add-leave-type/service/add-leave-type.service';
import { LeaveService } from './service/leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit, OnDestroy {

  leaveForm: FormGroup;
  isSubmitted = false;
  isSaving = false;
  savedMsg = false;
  userData = [];
  roles = [];
  deletedMsg = false;
  subscription = new Subscription();
  leaveTypeData = [];
  loggedUser: any;
  leaveData = [];
  leaveStatus = {
    0 : 'Pending',
    1 : 'Approved',
    2 : 'Canceled'
  };

  constructor( private fb: FormBuilder,
               private userService: UserService,
               alertConfig: NgbAlertConfig,
               private modalService: NgbModal,
               private addLeaveTypeService: AddLeaveTypeService,
               private rolesService: RolesService,
               private leaveService: LeaveService) {
                alertConfig.type = 'success';
                alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('userDetails'));
    this.getUsers();
    this.getLeaveType();
    this. getleave();
    this.leaveForm =  this.fb.group({
      leaveType: ['', Validators.required],
      noOfLeave: ['', Validators.required],
      approver: ['', Validators.required],
      empCode: [this.loggedUser.id],
      status: [0]
    });
    this.subscription.add(this.rolesService.getRole().subscribe((d) => {
      this.roles = d;
    }));
  }

  saveLeave() {
    this.isSubmitted = true;
    if (this.leaveForm.valid) {
      this.isSaving = true;
      this.subscription.add(this.leaveService.addLeave(this.leaveForm.value).subscribe((d) => {
          this.savedMsg = true;
          this.leaveForm.reset();
          this.isSaving = false;
          this.isSubmitted = false;
          this.getleave();
          setInterval( d => {
            this.savedMsg = false;
          }, 1000);
      }, error => {
        console.log(error);
      }));
    }
  }
  getUsers() {
    this.subscription.add(this.userService.getUser().subscribe( data => {
      this.userData = data;
    }));
  }
  getleave() {
    this.subscription.add(this.leaveService.getleave().subscribe( data => {
      this.leaveData = data;
    }));
  }
  deleteleave(id) {
    const modalRef = this.modalService.open(ConfirmBoxComponent);
    modalRef.componentInstance.message = 'Do you want remove';
    modalRef.result.then((decision) => {
    if (decision == 'confirm') {
      this.subscription.add(this.leaveService.deleteleave(id).subscribe((d) => {
      if (d) {
        this.deletedMsg = true;
        this.getleave();
        setTimeout(d => {
          this.deletedMsg = false;
        }, 1200);
      }
      }, (error) => {
      console.log(error);
      }));
    }
    });

  }

  filter(data, id) {
    return data.filter(d => d.id == id);
  }

  getLeaveType() {
    this.subscription.add(this.addLeaveTypeService.getLeaveType().subscribe( data => {
      this.leaveTypeData = data;
    }));
  }
  action(leave, stat) {
    // const reqData = {
    //   status: stat,
    //   id: leaveID
    // };
    leave.status = stat;
    this.subscription.add(this.leaveService.editLeave(leave).subscribe((d) => {
      console.log(d);
      // this.savedMsg = true;
      // this.isSaving = false;
      // this.isSubmitted = false;
      // this.getleave();
      // setInterval( d => {
      //   this.savedMsg = false;
      // }, 1000);
  }, error => {
    console.log(error);
  }));
  }

  ngOnDestroy() {
    if ( this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
