import { Component,OnInit,OnDestroy,ViewChild } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import{ User} from '../Models';
import { Router } from '@angular/router';
import {  MenuController,Platform } from '@ionic/angular';
import { LoginService } from 'poslibrary';
import { TranslateConfigService } from '../service/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  NameError!:string;
  PasswordError!:string;
  LoginError=" ";
  loginForm:FormGroup;
  User!:User;
  authStatus:boolean;
  online: boolean = navigator.onLine;
  showPassword:boolean=false;
  spinner=false;
  selectedLanguage:string;
  title:string;
  permission:string='cashierOnly';
  identification:string;
  min;
  error1;
  error2;
  error3
  customAlertOptions: any = {
    cssClass: 'customAlertCss',

  };
  @ViewChild('loginName') inputName  ;
  @ViewChild('loginPassword') inputPassword ;
  constructor(private platform:Platform, private translateConfigService:TranslateConfigService,private translate:TranslateService, public loginService:LoginService, public menuCtrl: MenuController,private formBuilder:FormBuilder,private router:Router, private authService:AuthService) {
  
    this.platform.backButton.subscribeWithPriority(-1, () => {
      App.exitApp();
  });
  
    this.User=new User;
   this.selectedLanguage=this.authService.language;
   this.ChangeLanguage(this.selectedLanguage);
   this.translate.get('HOME.identification').subscribe(data=>{
     this.identification=data;
   })
   this.translate.get('HOME.min').subscribe(data=>{
    this.min=data
  })
  this.translate.get('HOME.noConnection').subscribe(data=>{
    this.error1=data;
  })
  this.translate.get('HOME.server').subscribe(data=>{
    this.error2=data;
  })
  this.translate.get('HOME.invalid').subscribe(data=>{
    this.error3=data;
  })
  }
  
  ngOnInit(){
      this.initForm();
      this.authStatus=this.authService.isAuth; 
  }

  SubmitByEnter(){
     if(this.inputName.value.length>0){
       if(this.inputPassword.value.length>=6){
         this.onSubmitForm()
       }else{
         this.inputPassword.setFocus();
       }
     }else{
        console.log('Name');
        this.inputName.setFocus();
     }
}
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.inputName.setFocus();
  }
  ionViewDidLeave()
  {
    this.menuCtrl.enable(true);
  }
  
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
  
  initForm() {
    this.loginForm = this.formBuilder.group({
      Name: ['',Validators.required],
      Password: ['',[Validators.minLength(6),Validators.required]],
      Language:[this.selectedLanguage]
    });
  }

    resetError(){
      this.NameError='';
      this.PasswordError='';
      this.LoginError='';
    }

     async onSubmitForm()
     {
      const formValue = this.loginForm.value;
        this.LoginError='';
        let login: any;

        if(!this.online){
          this.LoginError=this.error1;  //'No connection';
          return false;
        }else{
          this.spinner=true;
          try
          {
            login=  await this.authService.GetUser(formValue['Name'],formValue['Password'],formValue['Language']);
            this.spinner=false;

          } catch (error) {
            this.spinner=false;
            this.LoginError= this.error2, //'Server error please try again';
            console.log('erroooor', error, JSON.stringify(error), formValue['Name'], formValue['Password'],formValue['Language']);
            return false;
          }

        }
        
        if( login !== 'null' ){
          this.authService.signIn().then(
           async () => {
              this.initForm()
              this.LoginError='';
              try {
                this.User=new User()
                this.authStatus = this.authService.isAuth;
                this.authService.User=login;
                
              } catch (error) {
               console.log(error) 
              } 
              this.ChangeLanguage(formValue['Language']);
              this.router.navigate(['/Loading'])
              
            }
          ); 
        }
        else{
          this.LoginError=this.error3 //'Invalid Password or Username';
        }
      }
      
      ChangeLanguage(lang){// this function will be call by the function calling when we have to save this in cookies;
        if(lang==='fr_FR'){
          this.translateConfigService.setLanguage('fr');
        }else{
          this.translateConfigService.setLanguage('en');
        }
      }



    //this part is just for the tests of multi scenario

    
  

}
