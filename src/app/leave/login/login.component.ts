import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user/srvice/user.service';
import { Subscription } from 'rxjs';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isSubmitted = false;
  subscription = new Subscription();
  loginFaileddMsg = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              alertConfig: NgbAlertConfig,
              private router: Router) { 
                alertConfig.type = 'danger';
                alertConfig.dismissible = false;
               }

  ngOnInit() {
    this.loginForm = this.fb.group({
      empCode: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.subscription.add(this.userService.getUser().subscribe( data => {
        const userdata = data.filter((d) => (d.empCode == this.loginForm.value.empCode && d.password == this.loginForm.value.password));
        if (userdata.length > 0) {
          this.loginFaileddMsg = false;
          sessionStorage.setItem('userDetails', JSON.stringify(userdata[0]));
          this.router.navigate(['/leave/manage-leave']);
        } else {
          this.loginFaileddMsg = true;
        }
      }));
    }

  }

  ngOnDestroy() {
    if ( this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
