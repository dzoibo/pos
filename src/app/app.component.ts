import { Component, OnDestroy } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
import { AuthService } from './guard/auth.service';
import { OrdersService } from './service/order.service';
import { MenuController } from '@ionic/angular';
import { User } from './Models';
import { CookieService } from 'ngx-cookie-service';
import { TranslateConfigService } from './service/translate-config.service';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})

export class AppComponent implements OnDestroy,OnDestroy {
  currentLink:string;
  status:boolean;
  User=new User;
  selectedLanguage;
  event$;
  constructor(private screenOrientation:ScreenOrientation, private platform: Platform ,public translateConfigService:TranslateConfigService,public menuCtrl: MenuController,private cookieService:CookieService, private authService:AuthService, private router:Router,private orderService:OrdersService) {
    if(this.platform.is('mobile')||this.platform.is('mobileweb')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    this.translateConfigService.setLanguage('en'); 
   localStorage.clear();
   this.event$=this.router.events
   .subscribe(
     (event: NavigationEvent) => {
       if(event instanceof NavigationStart) {
         this.setSelectedLink(event.url);
       }
     });
      
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
    this.cookieService.delete('userId');// we delete it one by one because we don't to clear all cookies (language is suppose to still be there)
    this.cookieService.delete('userName');
    this.cookieService.delete('userImage');
    this.cookieService.delete('userParner');
    this.cookieService.delete('permission')
  }

  setItem(item:string){
    this.currentLink=item;
    setTimeout(() => {
      this.closeMenu();
      this.router.navigate(['/'+item]);

    }, 300);
  }


   setSelectedLink(routerLink:string){
    switch ( routerLink) {
      case '/Cashier':
          this.currentLink='Cashier';
          break;
      case '/Catalog' :
          this.currentLink='Catalog'
          break;
      case '/New Order' :
          this.currentLink='Order'
          break;
      case '/Order' :
          this.currentLink='Order'
          break;
      default: 
          this.currentLink='Cashier'
          break;
     }
   }
  async closeMenu(){
    await this.menuCtrl.close();
  }
  ngOnDestroy() {
    this.event$.unsubscribe();
  }
  languageChanged(){// this function will be call by the function calling when twe have to save this in cookies;
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
