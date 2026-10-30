import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alert, AlertContent } from 'flowbite-angular/alert';
import { Button } from 'flowbite-angular/button';
import { Card, CardContent, CardHeader } from 'flowbite-angular/card';
import { FormControl, FormField, Label } from 'flowbite-angular/form';

import { AuthService } from '../../../core/auth/auth.service';
import { GraphqlClientError } from '../../../core/graphql/graphql.error';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    Card,
    CardHeader,
    CardContent,
    FormField,
    Label,
    FormControl,
    Button,
    Alert,
    AlertContent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.errorMessage.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();

    this.auth.login({ email, password }).subscribe({
      next: () => {
        this.submitting.set(false);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const target =
          returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')
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
        this.errorMessage.set('No se pudo iniciar sesión. Inténtalo de nuevo.');
      },
    });
  }
}
