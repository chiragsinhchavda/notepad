import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	registerForm: any

	constructor(
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.createForm()
	}

	register(){
		console.log('Register Data : ', this.registerForm.value)
		try{
			if(this.registerForm.value){
				//code for register data to database
				this.router.navigate(['login'])
			}
		}catch(e){
			console.log("Error : ",e)
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
