import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { OrdersService } from '../service/order.service';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { User } from '../Models';
import { CookieService } from 'ngx-cookie-service';
import { CashierPage } from 'e2e/src/Cashier/cashier.po';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blanck-page',
  templateUrl: './blanck-page.component.html',
  styleUrls: ['./blanck-page.component.scss'],
})
export class BlanckPageComponent implements OnInit {

  User:User;
  permission:string;
  spinner=false;
  permission1;
  permission2;
  permission3;
  message;
  constructor(private translate:TranslateService,private cookieService:CookieService, public menuCtrl: MenuController, private router:Router, private alertController:AlertController,private authService:AuthService,private orderService:OrdersService) {
    this.User=new User;
    
   }

  ngOnInit() {
    this.translate.get('Global.permission1').subscribe(data=>{
      this.permission1=data;
    })
    this.translate.get('Global.permission2').subscribe(data=>{
      this.permission2=data;
    })
    this.translate.get('Global.permission3').subscribe(data=>{
      this.permission3=data;
    });
     this.translate.get('Global.message').subscribe(data=>{
      this.message=data;
    })
    if(this.cookieService.check('permission')){
      this.router.navigate(['/Order']);
      }else{
        this.presentAlertPrompt()
      }
      
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'alert-permission',
      header:this.message ,
      backdropDismiss:false,
      inputs: [
        {
          type: 'radio',
          label: this.permission2,
          value: 'seller',
          cssClass:'changeRadio',
        
        },
        {
          type: 'radio',
          label: this.permission3,
          value: 'cashier',
          cssClass:'changeRadio',
        },
        {
          type: 'radio',
          label: this.permission1,
          value: 'seller & cashier',
          cssClass:'changeRadio',
          checked:true,
        }
      ],
      buttons: [
        {
          text: 'Ok',
          id:'changeOk',
          handler: (data) => {
            this.permission=data;
            this.authService.permission=this.permission;
            this.authService.User.userParner=this.permission;
             this.authService.createCookies();
             console.log(this.permission);
             this.spinner=true;
             setTimeout(() => {
              if(this.permission==='seller'){
                this.router.navigate(['Order']);
              }else{
                this.router.navigate(['Cashier']);
                console.log(this.permission);
              }
             }, 2000);
             
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    if(this.cookieService.check('permission')){
      this.router.navigate(['/Order']);
      }
  }
  ionViewDidLeave()
  {
    this.menuCtrl.enable(true);
  }
}
