import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
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

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this.router.navigate(['/admin-mechanic-panel']);
        } else {
          this.errorMessage = res.message || 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        // BE returns { non_field_errors: ["Invalid credentials"] } on 400
        const body = err?.error;
        if (body?.non_field_errors?.length) {
          this.errorMessage = body.non_field_errors[0];
        } else if (body?.detail) {
          this.errorMessage = body.detail;
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
