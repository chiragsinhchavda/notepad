import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	loginForm: any
	errorMessage:any

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		public authenticationService: AuthenticationService
	) {
		this.createForm()
	}

	login() {
		console.log('this.loginForm.value : ', this.loginForm.value)
		try {
			if (this.loginForm.valid) {
				this.authenticationService.apiCall('post', 'http://127.0.0.1:3000/auth/login', this.loginForm.value).pipe(finalize(() => {
					console.log('Login Api call successfull...')
				})).subscribe((res: any) => {
					console.log('res : ', res)
					if (res && res.data) {
						let credintial = JSON.stringify(res.data)
						localStorage.setItem('userData',credintial)
						this.router.navigate(['notepad'])
					} else {
						this.errorMessage = res.message
					}
				}, (err: any) => {
					console.log('API ERROR : ', err)
				})
			}
		} catch (e) {
			console.log('Error : ', e)
		}
	}

	createForm() {
		console.log('Loginform created....')
		this.loginForm = this.formBuilder.group({
			email: [null, Validators.required],
			password: [null, Validators.required]
		})
	}
}
