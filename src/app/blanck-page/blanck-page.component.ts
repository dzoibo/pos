import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { OrdersService } from '../service/order.service';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { User } from '../Models';
import { CookieService } from 'ngx-cookie-service';
import { CashierPage } from 'e2e/src/Cashier/cashier.po';

@Component({
  selector: 'app-blanck-page',
  templateUrl: './blanck-page.component.html',
  styleUrls: ['./blanck-page.component.scss'],
})
export class BlanckPageComponent implements OnInit {

  User:User;
  permission:string;
  spinner=false;
  constructor(private router:Router, private alertController:AlertController,private authService:AuthService,private orderService:OrdersService) {
    this.User=new User;
   }

  ngOnInit() {
    this.presentAlertPrompt()
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'alert-permission',
      header: 'Please select the role you want to use',

      inputs: [
        {
          type: 'radio',
          label: 'Seller',
          value: 'seller',
          cssClass:'changeRadio',
        
        },
        {
          type: 'radio',
          label: 'Cashier',
          value: 'cashier',
          cssClass:'changeRadio',
        },
        {
          type: 'radio',
          label: 'Seller & Cashier',
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
}
