import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private httpService: HttpClient) { }

  ngOnInit(){}

  apiCall(method:any, url:any, payload?:any, queryParams?:any){
	try{
		const httpService:any = this.httpService
		if(method === 'post' || method === 'put'){
			return httpService[method](url, payload, queryParams).pipe(map((res: any) => res))
		}
		if(method === 'delete' || method === 'get'){
			return httpService[method](url, queryParams).pipe(map((res: any) => res))
		}
	}catch(e:any){
		console.log('Api Error : ', e)
	}
  }
}
