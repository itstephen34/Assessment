import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbAlertConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './srvice/user.service';
import { ConfirmBoxComponent } from 'src/app/shared/component/confirm-box/confirm-box.component';
import { RolesService } from '../role/service/roles.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  isSubmitted = false;
  isSaving = false;
  savedMsg = false;
  userData = [];
  roles = [];
  deletedMsg = false;
  subscription = new Subscription();

  constructor( private fb: FormBuilder,
               private userService: UserService,
               alertConfig: NgbAlertConfig,
               private modalService: NgbModal,
               private rolesService: RolesService) {
                alertConfig.type = 'success';
                alertConfig.dismissible = false;
  }

  ngOnInit() {
    this.getUsers();
    this.userForm =  this.fb.group({
      name: ['', Validators.required],
      empCode: ['', Validators.required],
      role: [0, Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.subscription.add(this.rolesService.getRole().subscribe((d) => {
      this.roles = d;
    }));
  }

  saveUser() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.isSaving = true;
      this.subscription.add(this.userService.addUser(this.userForm.value).subscribe((d) => {
          this.savedMsg = true;
          this.userForm.reset();
          this.isSaving = false;
          this.isSubmitted = false;
          this.getUsers();
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

  deleteUser(id) {
    const modalRef = this.modalService.open(ConfirmBoxComponent);
    modalRef.componentInstance.message = 'Do you want remove';
    modalRef.result.then((decision) => {
    if (decision == 'confirm') {
      this.subscription.add(this.userService.deleteUser(id).subscribe((d) => {
      if (d) {
        this.deletedMsg = true;
        this.getUsers();
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

  filterRole(id) {
    return this.roles.filter(d => d.id == id);
  }

  ngOnDestroy() {
    if ( this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
