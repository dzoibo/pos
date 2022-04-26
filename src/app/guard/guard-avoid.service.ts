import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, interval} from 'rxjs'
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class GuardAvoidService {

  constructor(private authService: AuthService,
              private router: Router,private cookieService:CookieService,) { }




canActivate ( next:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable <boolean> | Promise<boolean> | boolean
   {
    if(this.authService.isAuth===false) {
      return true;
    } else {
      this.router.navigate(['/Cashier']);
      return false;
    }
  }
}