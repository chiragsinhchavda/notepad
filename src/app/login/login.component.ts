import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	loginForm: any
	private loginId: string = 'chiragc.test@gmail.com'
	private loginIdPass: string = 'Admin@123'

	constructor(
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.createForm()
	}

	login() {
		console.log('this.loginForm.value : ', this.loginForm.value)
		try {
			if (this.loginForm.value) {
				//code for authenticate user....
				if (this.loginForm.value.email.trim() === this.loginId.trim() && this.loginForm.value.password === this.loginIdPass) {
					let credintial = JSON.stringify(this.loginForm.value)
					console.log('Credintial : ',credintial)
					localStorage.setItem('userData',credintial)
					this.router.navigate(['notepad'])
				} else {
					alert('Invalid login credintials!!')
				}
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
