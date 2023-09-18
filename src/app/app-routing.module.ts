import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotepadComponent } from './notepad/notepad.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: 'login',
    	component: LoginComponent,
		canActivate:[NotAuthGuard]
	},
	{
		path: 'register',
    	component: RegisterComponent,
		canActivate:[NotAuthGuard]
	},
	{
		path: 'forgot-password',
    	component: ForgotPasswordComponent,
		canActivate:[NotAuthGuard]
	},
	{
		path: 'notepad',
    	component: NotepadComponent,
		canActivate:[AuthGuard]
	},
	{
		path: '**',
    	redirectTo: 'login',
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
