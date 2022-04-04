import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, firstValueFrom, Subject } from 'rxjs';
import { User } from '../Models';
import { Platform } from '@ionic/angular';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  User= new User;
  permission:string;
  isAuth = false;
  language='en_US';
  languageChange: BehaviorSubject<string> 
  
  constructor(private loginService:LoginService,private platform:Platform, private cookieService:CookieService){
    if(this.cookieService.check('language')){
      if(this.decryptData(cookieService.get('language'))==='fr_FR'){
        this.language='fr_FR'
      }else{
        this.language='en_US'
      }
     this.languageChange= new BehaviorSubject<string>(this.language);
    }
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


  async GetUser(userName:string,passWord:string,language:string='en_US'):Promise<any> {
    //, '1000116', '1011698'
    this.language=language;
    const data: any = await firstValueFrom(this.loginService.authenticateUser(userName, passWord,language));
    console.log('daataaa',JSON.stringify(data) , data.WindowTabData);
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
    var timeOut;
    if((this.platform.is( 'mobile') || this.platform.is('tablet') )&& !this.platform.is( 'mobileweb') ) {
      timeOut=0;
    }else{
      timeOut=86400;
    }
    this.cookieService.set('userId', this.encryptData(this.User.userId+''),{ expires: timeOut });
    this.cookieService.set('userName', this.encryptData(this.User.userName),{ expires: timeOut });
    this.cookieService.set('userImage', this.encryptData(this.User.userImage),{ expires: timeOut });
    this.cookieService.set('userParner', this.encryptData(this.User.userParner),{ expires: timeOut });
    this.cookieService.set('permission', this.encryptData(this.permission),{ expires: timeOut });
    this.cookieService.set('language', this.encryptData(this.language),{ expires: 0});
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

