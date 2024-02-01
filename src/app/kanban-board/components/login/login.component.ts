import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { ToastsComponent } from '../toasts/toasts.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ModalService,
    private authGuard: SecurityGuard,
    private snackbar: MatSnackBar
  ) { }


  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginFormControl() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, 
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$'), 
        // Validators.minLength(8)
      ]),
      token: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
    })
  }

  ngOnInit(): void {
    this.loginFormControl();
    this.merchantLogoutBeforeLogin();
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.service.merchantLoginMockData(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.service.setSuccessMessage(res?.description)
          this.snackbar.openFromComponent(ToastsComponent,{
            duration: 4000,
          })
          const stringifyUserDetails = JSON.stringify(res?.userDetails);
          this.service.setUserData(stringifyUserDetails);
          this.router.navigate(['/KanbanBoard/dashboard'], {
            relativeTo: this.route,
            queryParams: {
              email: this.loginForm.get('email')?.value
            }
          });
        },
        error: (err: any) => {
          console.error('error from login>>', err);
          this.service.setErrorMessage(err);
          this.snackbar.openFromComponent(ToastsComponent,{
            duration: 4000,
          })
        }
      })
    }
  }

  merchantLogoutBeforeLogin() {  // User remain's loggedIn unless he logs out
    if (
      this.service.userIsLoggedIn() && !this.authGuard.canActivate == false
    ) {
      this.router.navigate(['/KanbanBoard/dashboard'], { relativeTo: this.route });
    }
  }


}
