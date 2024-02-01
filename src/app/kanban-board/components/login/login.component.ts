import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
  ){}


  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginFormControl(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.loginFormControl();
  }

  loginUser(){
 if(this.loginForm.valid){
  this.router.navigate(['/KanbanBoard/dashboard'],
  {
    relativeTo: this.route,
    queryParams: {
      username: this.loginForm.get('email')?.value
    }
  });
 }
  }
}
