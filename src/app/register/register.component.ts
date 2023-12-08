import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	registerForm: any
	errorMessage:any

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		public authenticationService: AuthenticationService
	) {
		this.createForm()
	}

	register() {
		console.log('Register Data : ', this.registerForm.value)
		if (this.registerForm.valid) {
			try {
				this.authenticationService.apiCall('post', 'http://127.0.0.1:3000/auth/register', this.registerForm.value).pipe(finalize(() => {
					console.log('Registreation Api call successfull...')
				})).subscribe((res: any) => {
					console.log('res : ', res)
					if (res && res.data) {
						this.router.navigate(['login'])
					} else {
						this.errorMessage = res.message
					}
				}, (err: any) => {
					console.log('API ERROR : ', err)
				})
			} catch (e) {
				console.log("Error : ", e)
			}
		}
	}


	createForm(){
		console.log('Register for created...')
		this.registerForm = this.formBuilder.group({
			email: [null,Validators.required],
			password: [null,Validators.required]
		})
	}
}
