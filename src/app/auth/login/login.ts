import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password, rememberMe } = this.loginForm.value;

    // TODO: Replace with actual auth service call
    console.log('Login payload:', { email, password, rememberMe });

    // Simulate API call — replace with real service
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/admin-mechanic-panel']);
    }, 1500);
  }

  userType: 'admin' | 'mechanic' = 'admin';

  setUserType(type: 'admin' | 'mechanic'): void {
    this.userType = type;
  }

  get f() {
    return this.loginForm.controls;
  }
}
