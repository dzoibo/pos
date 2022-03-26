import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'poslibrary';
import { User } from '../Models';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  User= new User;
  permission:string;
  isAuth = false;
  constructor(private loginService:LoginService,private platform:Platform, private cookieService:CookieService){

    if(cookieService.check('userId')&&cookieService.check('userName')&&cookieService.check('userImage')&&cookieService.check('userParner')){
      try {
        this.User.userId=parseInt(this.decryptData(cookieService.get('userId')));
        this.User.userName=this.decryptData(cookieService.get('userName'));
        this.User.userParner=this.decryptData(cookieService.get('userParner'));
        this.User.userImage=this.decryptData(cookieService.get('userImage'));
        this.permission=this.decryptData(cookieService.get('permission'));
        this.isAuth=true;
      } catch (error) {
        this.isAuth=false
      }
    }
  }


  async GetUser(userName:string='medard@ranites.com',passWord:string='medard'):Promise<any> {
    const data: any = await this.loginService.login(userName, passWord).toPromise(); // it's mustly using when we make a http request, it's converting the method to a promise 
    console.log(data.WindowTabData);
      if(data.WindowTabData.Error){
        console.log(data.WindowTabData.Error);
        return 'null';
      }else{
        console.log(data.WindowTabData.DataSet.DataRow.field[2].val);
        var userinfo=data.WindowTabData.DataSet.DataRow.field;
        this.User.userId=userinfo[0].val;
        this.User.userName=userinfo[1].val;
        this.User.userParner='Cashier';
        this.User.userImage='../assets/pp.png';
        return this.User;
      }
  }



  createCookies(){
    if(this.platform.is( 'mobile') && !this.platform.is( 'mobileweb') ) {
      var timeOut=0;
    }else{
      var timeOut=86400;
    }
    this.cookieService.set('userId', this.encryptData(this.User.userId+''),{ expires: timeOut });
    this.cookieService.set('userName', this.encryptData(this.User.userName),{ expires: timeOut });
    this.cookieService.set('userImage', this.encryptData(this.User.userImage),{ expires: timeOut });
    this.cookieService.set('userParner', this.encryptData(this.User.userParner),{ expires: timeOut });
    this.cookieService.set('permission', this.encryptData(this.permission),{ expires: timeOut });
  }
  encryptData(text:string){
    var CryptoJS = require("crypto-js");
    var encryptText = CryptoJS.AES.encrypt(text, 'RanitesP2022').toString();
    return encryptText; 
  }
  
  decryptData(encryptText){
    var CryptoJS = require("crypto-js");
    var bytes  = CryptoJS.AES.decrypt(encryptText, 'RanitesP2022');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  }

  signIn() {
      return new Promise(
      (resolve, reject) => {
          setTimeout(
          () => {
              this.isAuth = true;
              resolve(true);
          }, 1
          );
      }
      );
  }

  signOut() {
      this.isAuth = false;
  }
}