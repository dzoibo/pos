import { Component } from '@angular/core';
import { AuthService } from './guard/auth.service';
import { OrdersService } from './service/order.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from './Models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  currentLink:string;
  status:boolean;
  User=new User;
  constructor(public menuCtrl: MenuController,private cookieService:CookieService, private authService:AuthService, private router:Router,private orderService:OrdersService) {
  }
  ngOnInit(){
    this.status=this.authService.isAuth;
    this.currentLink='Cashier';
    this.User=this.authService.User;
  }
   async signOut(){
    this.authService.signOut();
    this.status=this.authService.isAuth;
    await  this.closeMenu()
    this.router.navigate(['/home']);
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  setItem(item:string){
    this.currentLink=item;
    setTimeout(() => {
      this.closeMenu()
    }, 300);
  }

  async closeMenu(){
    await this.menuCtrl.close();
  }
}
