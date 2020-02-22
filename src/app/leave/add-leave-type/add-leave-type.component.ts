import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { AddLeaveTypeService } from './service/add-leave-type.service';
import { NgbAlertConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxComponent } from 'src/app/shared/component/confirm-box/confirm-box.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.scss'],
  providers: [NgbAlertConfig]
})
export class AddLeaveTypeComponent implements OnInit, OnDestroy {

  leaveTypeForm: FormGroup;
  isSubmitted = false;
  isSaving = false;
  savedMsg = false;
  leaveTypeData = [];
  deletedMsg = false;
  subscription = new Subscription();

  constructor( private fb: FormBuilder,
               private addLeaveTypeService: AddLeaveTypeService,
               alertConfig: NgbAlertConfig,
               private modalService: NgbModal,) {
                alertConfig.type = 'success';
                alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.getLeaveType();
    this.leaveTypeForm =  this.fb.group({
      leaveCategory: ['', Validators.required],
      leaveCode: ['', Validators.required]
    });
  }

  saveLeaveType() {
    this.isSubmitted = true;
    if(this.leaveTypeForm.valid) {
      this.isSaving = true;
      this.subscription.add(this.addLeaveTypeService.addLeaveType(this.leaveTypeForm.value).subscribe((d) => {
          this.savedMsg = true;
          this.leaveTypeForm.reset();
          this.isSaving = false;
          this.isSubmitted = false;
          this.getLeaveType();
          setInterval( d => {
            this.savedMsg = false;
          }, 1000);
      }, error => {
        console.log(error);
      }));
    }
  }
  getLeaveType() {
    this.subscription.add(this.addLeaveTypeService.getLeaveType().subscribe( data => {
      this.leaveTypeData = data;
    }));
  }

  deleteLeaveType(id) {
    const modalRef = this.modalService.open(ConfirmBoxComponent);
    modalRef.componentInstance.message = 'Do you want remove';
    modalRef.result.then((decision) => {
    console.log(decision);
    if (decision == 'confirm') {
      this.subscription.add(this.addLeaveTypeService.deleteLeaveType(id).subscribe((d) => {
      if (d) {
        this.deletedMsg = true;
        this.getLeaveType();
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
  ngOnDestroy() {
    if ( this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
