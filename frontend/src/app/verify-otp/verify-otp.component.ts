import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/api/auth.service';
import { ApiService } from 'src/app/api/api.service';
import { UtilsService } from '../utils/utils.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  otp: any;
  loginResponse: any;
  currentUser: any;
  email: any;
  maskedEmail!: string;
  resendTimer: number = 60;
  product_id: any;

  constructor(private router: Router, private apiService: ApiService,
    private utilsService: UtilsService, private authApiService: AuthApiService) {

  }

  ngOnInit(): void {
    const loginResponseString = localStorage.getItem('currentUser');
    if (loginResponseString) {
      this.loginResponse = JSON.parse(loginResponseString);
    }
    const storedProductId = localStorage.getItem('product_id');
    console.log(storedProductId)

    // Use the stored value if present, otherwise use the default from environment
    const product_id = storedProductId !== null ? storedProductId : environment.productId;
    if (product_id && typeof product_id !== 'string') {
      this.product_id = JSON.parse(product_id);
    } else {
      this.product_id = product_id;
    }
    this.maskedEmail = this.maskEmail(this.loginResponse.email);
    this.startResendTimer();
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  }
  maskEmail(email: string): string {
    const parts = email.split('@');
    const username = parts[0];
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return maskedUsername + '@' + parts[1];
  }
  startResendTimer() {
    const intervalId = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  resendVerification() {
    this.resendTimer = 60;
    this.otp = '';
    this.ngOtpInputRef.setValue('');
    this.utilsService.loadSpinner(true);
    this.authApiService.login({ email: this.loginResponse.email }, "mfa/resendverfication")
      .then((response: any) => {
        if (response?.status === 200) {
          this.startResendTimer();
          this.utilsService.loadToaster({ severity: 'success', summary: 'SUCCESS', detail: response?.data?.Message });
        } else {
          this.utilsService.loadToaster({ severity: 'error', summary: 'ERROR', detail: response.data.detail });
        }
        this.utilsService.loadSpinner(false);
      })
      .catch((error: any) => {
        this.utilsService.loadSpinner(false);
        this.utilsService.loadToaster({ severity: 'error', summary: 'ERROR', detail: error });
      });
  }
  verifyAccount() {


    const storedProductId = localStorage.getItem('product_id');
    console.log(storedProductId)

    // Use the stored value if present, otherwise use the default from environment
    const product_id = storedProductId !== null ? storedProductId : environment.productId;
    this.utilsService.loadSpinner(true);
    this.authApiService.login({ email: this.loginResponse.email, otp: this.otp }, "mfa/verifyOTP")
      .then((response: any) => {
        if (response?.status === 200 && !response?.data?.detail) {
          localStorage.setItem('isVerified', 'true');
          localStorage.setItem('currentUser', JSON.stringify(response?.data));
          this.utilsService.loadToaster({ severity: 'success', summary: 'SUCCESS', detail: "OTP verified successfully" });
          this.router.navigate(['/dashboard'], { queryParams: { email: response.data.email, id: this.product_id, has_insights: true, isVerified: true } });
        } else {
          this.utilsService.loadToaster({ severity: 'error', summary: 'ERROR', detail: response.data.detail });
          this.utilsService.loadSpinner(false);
        }
      })
      .catch((error: any) => {
        this.utilsService.loadSpinner(false);
        this.utilsService.loadToaster({ severity: 'error', summary: 'ERROR', detail: error?.response?.data?.detail });
      });
  }

  onClickLogout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}

