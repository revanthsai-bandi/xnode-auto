import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../api/auth.service';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'xnode-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loginBtn: boolean = false;
  errorMessage!: string;
  messages: any = [
  ];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private authApiService: AuthApiService,
    private utils: UtilsService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: new FormControl<string | null>(null)
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let queryParams = params;
      if (params.product_id)
        localStorage.setItem('product_id', queryParams.product_id)
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    localStorage.removeItem('isVerified')
  }

  get login() { return this.loginForm.controls; }

  onClickLogin() {
    this.utils.loadSpinner(true);
    localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value));
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let body = { ...this.loginForm.value };
    delete body.rememberMe;
    this.loginBtn = true;
    this.authApiService.login(body, "auth/prospect/login").then((response: any) => {
      if (response?.status === 200 && !response?.data?.detail) {
        this.loginBtn = false;
        this.router.navigate(['/verify-otp']);
      } else {
        this.loginBtn = false;
        this.utils.loadToaster({ severity: 'error', summary: 'ERROR', detail: response?.data?.detail });
      }
      this.utils.loadSpinner(false);
    }).catch((error: any) => {
      this.utils.loadToaster({ severity: 'error', summary: 'ERROR', detail: error });
      this.utils.loadSpinner(false);
    });
  }
}
