import { Component } from '@angular/core';
import { AuthService } from './guard/auth.service';
import { OrdersService } from './service/order.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from './Models';
import { CookieService } from 'ngx-cookie-service';
import { TranslateConfigService } from './service/translate-config.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})

export class AppComponent {
  currentLink:string;
  status:boolean;
  User=new User;
  selectedLanguage;
  constructor(public translateConfigService:TranslateConfigService,public menuCtrl: MenuController,private cookieService:CookieService, private authService:AuthService, private router:Router,private orderService:OrdersService) {
   this.translateConfigService.setLanguage('en'); 
   localStorage.clear();
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
  languageChanged(){// this function will be call by the function calling when twe have to save this in cookies;
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
