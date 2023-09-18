import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
	forgotForm:any
	isOtpSent:boolean = false
	isOtpVerified:boolean = false

	constructor(
		private formBuilder: FormBuilder,
		){
		this.createForm()
		//this.forgotForm.controls['email'].valueChanges.subscribe((value:any) => {
		//	if(this.forgotForm.value.email !== value) { 
		//		if(this.isOtpSent) { this.isOtpSent = false }
		//		if(this.isOtpVerified) { this.isOtpVerified = false }
		//	} else { 
		//		if(!this.isOtpSent) { this.isOtpSent = true }
		//		if(!this.isOtpVerified) { this.isOtpVerified = true }
		//	}
		//})
	}

	sendOtp(){
		console.log('this.forgotForm.value : ',this.forgotForm.value)
		alert(`Otp sent seccessfully to ${this.forgotForm.value.email}`)
		if(this.forgotForm.value.email.trim()){
			this.isOtpSent = true
			this.forgotForm.controls['otp'].setValidators([Validators.required])
			this.forgotForm.controls['otp'].updateValueAndValidity();
		}
	}

	verifyOtp(){
		if(Number(this.forgotForm.value.otp) === 123){
			console.log('Otp Verified!!')
			this.isOtpVerified = true
			this.forgotForm.controls['password'].setValidators([Validators.required])
			this.forgotForm.controls['password'].updateValueAndValidity();
		}
	}

	changePassword(){
		console.log('password changed : ',this.forgotForm.value)
		if(this.forgotForm.value){
			this.isOtpSent = false
			this.isOtpVerified = false
			this.forgotForm.reset()
			alert('Password changed!!')
		}
	}

	createForm(){
		console.log('Forgot Form Created.....')
		this.forgotForm = this.formBuilder.group({
			email: [null, Validators.required],
			otp: [null],
			password: [null]
		})
	}
}
