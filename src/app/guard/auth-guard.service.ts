
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs'
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn:'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,private router: Router) { }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable <boolean> | Promise<boolean> | boolean
   {
    if(this.authService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/home']);
       return false;
    }
  }
}