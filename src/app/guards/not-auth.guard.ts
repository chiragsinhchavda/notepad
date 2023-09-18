import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

	constructor(private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		let credintials: any = localStorage.getItem('userData');
		console.log('Check auth for credintials in not auth guard : ', credintials)
		if (credintials) {
			this.router.navigate(['notepad'])
			return false
		}
		return true;
	}

}
