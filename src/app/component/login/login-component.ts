import {Component, Inject, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authenticated-service';
// import {ToastrService} from 'ngx-toastr';
import {Path} from '../../paths';


@Component({
  selector: 'app-login',
  templateUrl: 'login-component.html',
  })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = 'home';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private toast: ToastrService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4) ]]
    });

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.authenticate(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.toast.success("You successful Log in.");
          this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          this.loading = false;
          // this.toast.error("Email or password wrong.")
          this.router.navigate(['login']);
        });
  }
}
