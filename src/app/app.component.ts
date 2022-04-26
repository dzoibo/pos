import { Component, OnDestroy } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent, ActivatedRoute } from '@angular/router';
import { AuthService } from './guard/auth.service';
import { OrdersService } from './service/order.service';
import { MenuController,IonRouterOutlet, Platform } from '@ionic/angular';
import { User } from './Models';
import { CookieService } from 'ngx-cookie-service';
import { TranslateConfigService } from './service/translate-config.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { TranslateService } from '@ngx-translate/core';




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
  permission:string='';
  role;
  

  constructor( private route: ActivatedRoute, private translate:TranslateService, private auth:AuthService, private screenOrientation:ScreenOrientation, private platform: Platform ,public translateConfigService:TranslateConfigService,public menuCtrl: MenuController,private cookieService:CookieService, private authService:AuthService, private router:Router,private orderService:OrdersService) {
    this.permission=this.auth.permission;
   
    if((this.platform.is('mobile')||this.platform.is('mobileweb'))&& !this.platform.is('tablet')){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
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
    this.User=this.authService.User;
    this.authService.languageChange.subscribe((value) => {
      this.ChangeLanguage(value);
  });

    if(this.permission==='seller'){
      console.log(this.permission);
      this.translate.get('Global.permission2').subscribe(data=>{
        this.role=data;
      })
    }else if(this.permission==='cashier'){
      this.translate.get('Global.permission3').subscribe(data=>{
        this.role=data;
      })
    }else{
      this.translate.get('Global.permission1').subscribe(data=>{
        this.role=data;
      })
    }
  }

  

   async signOut(){
    this.authService.signOut();
    this.status=this.authService.isAuth;
    await  this.closeMenu()
    localStorage.clear();
    this.cookieService.delete('userId');// we delete it one by one because we don't to clear all cookies (language is suppose to still be there)
    this.cookieService.delete('userName');
    this.cookieService.delete('userImage');
    this.cookieService.delete('userParner');
    this.cookieService.delete('permission');
    this.router.navigate(['/home']);
  }

  setItem(item:string){
    if(this.permission==='seller & cashier'){
      this.router.navigate(['/Cashier']);
      this.closeMenu();
    }else{
      this.currentLink=item;
      setTimeout(() => {
        this.closeMenu();
        this.router.navigate(['/'+item]);
  
      }, 300);
    }
    
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
      case '/Order detail' :
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
    this.authService.languageChange.unsubscribe();
  }
  ChangeLanguage(lang){// this function will be call by the function calling when we have to save this in cookies;
    if(lang==='fr_FR'){
      this.translateConfigService.setLanguage('fr');
    }else{
      this.translateConfigService.setLanguage('en');
    }
  }
}
