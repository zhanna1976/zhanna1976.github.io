import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { passwordStrengthValidator } from '../validators/password-strength-validator';
import { confirmPasswordValidator } from '../validators/password-match-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  success = false;
  errMessage = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

  formGroupPassword!: FormGroup;

  confirmPasswordMessage = 'The passwords do not match.';
  invalidPasswordMessage =
    'Must contain at least 1 number, 1 uppercase letter, 1 lowercase letter and at least 8 characters.';

  ngOnInit() {
    const passwordControl = this._formBuilder.control(
      {
        disabled: false,
        value: null,
      },
      [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator(),
      ]
    );

    const confirmPasswordControl = this._formBuilder.control(
      {
        disabled: false,
        value: null,
      },
      [
        Validators.required,
        Validators.minLength(8),
        confirmPasswordValidator(passwordControl),
      ]
    );

    this.formGroupPassword = this._formBuilder.group({
      confirm: confirmPasswordControl,
      password: passwordControl,
    });
  }

  userSignUp = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.userSignUp.valid && this.formGroupPassword?.valid) {
      this.authService
        .signUp({
          username: this.userSignUp.get('username')?.value!,
          email: this.userSignUp.get('email')?.value!,
          password: this.formGroupPassword.get('password')?.value!,
          token: uuidv4(),
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.success = true;
            console.log(this.formGroupPassword.value);
            this.router.navigate(['/log-in']);
          },
          error: err => {
            if (err.error.code == 11000)
              this.errMessage = 'User already exists!! Try something else.';
            else this.errMessage = 'Something went wrong!!';
          },
        });
    } else {
      this.errMessage = 'Please enter valid values';
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
