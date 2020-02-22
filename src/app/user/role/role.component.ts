import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbAlertConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from './service/roles.service';
import { ConfirmBoxComponent } from 'src/app/shared/component/confirm-box/confirm-box.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {

  rolesForm: FormGroup;
  isSubmitted = false;
  isSaving = false;
  savedMsg = false;
  rolesData = [];
  deletedMsg = false;
  subscription = new Subscription();;

  constructor( private fb: FormBuilder,
               private rolesService: RolesService,
               alertConfig: NgbAlertConfig,
               private modalService: NgbModal,) {
                alertConfig.type = 'success';
                alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.getRole();
    this.rolesForm =  this.fb.group({
      roleName: ['', Validators.required],
      roleCode: ['', Validators.required]
    });
  }

  saveRoles() {
    this.isSubmitted = true;
    if (this.rolesForm.valid) {
      this.isSaving = true;
      this.subscription.add(this.rolesService.addRole(this.rolesForm.value).subscribe((d) => {
          this.savedMsg = true;
          this.rolesForm.reset();
          this.isSaving = false;
          this.isSubmitted = false;
          this.getRole();
          setInterval( d => {
            this.savedMsg = false;
          }, 1000);
      }, error => {
        console.log(error);
      }));
    }
  }

  getRole() {
    this.subscription.add(this.rolesService.getRole().subscribe( data => {
      this.rolesData = data;
    }));
  }

  deleteRole(id) {
    const modalRef = this.modalService.open(ConfirmBoxComponent);
    modalRef.componentInstance.message = 'Do you want remove';
    modalRef.result.then((decision) => {
    if (decision == 'confirm') {
      this.subscription.add(this.rolesService.deleteRole(id).subscribe((d) => {
      if (d) {
        this.deletedMsg = true;
        this.getRole();
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
