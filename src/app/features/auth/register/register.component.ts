import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alert, AlertContent } from 'flowbite-angular/alert';
import { Button } from 'flowbite-angular/button';
import { Card, CardContent, CardHeader } from 'flowbite-angular/card';
import { FormControl, FormField, Label } from 'flowbite-angular/form';

import { AuthService } from '../../../core/auth/auth.service';
import { GraphqlClientError } from '../../../core/graphql/graphql.error';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!password || !confirmPassword || password === confirmPassword) {
    return null;
  }
  return { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Card,
    CardHeader,
    CardContent,
    FormField,
    Label,
    FormControl,
    Button,
    Alert,
    AlertContent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(/\S/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

  onSubmit(): void {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const { name, email, password } = this.form.getRawValue();

    this.auth
      .register({ name: name.trim(), email: email.trim(), password })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          const target =
            returnUrl &&
            returnUrl.startsWith('/') &&
            !returnUrl.startsWith('//')
              ? returnUrl
              : '/dashboard';
          void this.router.navigateByUrl(target);
        },
        error: (error: unknown) => {
          this.submitting.set(false);
          if (error instanceof GraphqlClientError) {
            this.errorMessage.set(error.message);
            return;
          }
          this.errorMessage.set('No se pudo crear la cuenta. Inténtalo de nuevo.');
        },
      });
  }
}
