import { Component,OnInit,OnDestroy,ViewChild } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import{ User} from '../Models';
import { OrdersService } from '../service/order.service';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { LoginService } from 'poslibrary';
import { TranslateConfigService } from '../service/translate-config.service';
import { CashierPage } from 'e2e/src/Cashier/cashier.po';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
  permission:string='cashierOnly';
  @ViewChild('loginName') inputName  ;
  @ViewChild('loginPassword') inputPassword ;
  constructor(private alertController:AlertController, public translateConfigService:TranslateConfigService, public loginService:LoginService, public menuCtrl: MenuController,private formBuilder:FormBuilder,private router:Router, private authService:AuthService,private orderService:OrdersService) {
   this.User=new User;
   this.translateConfigService.setLanguage('en'); 
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

        if(!this.online){
          this.LoginError='No connection';
          return false;
        }else{
          this.spinner=true;
          try
          {
            var login=  await this.authService.GetUser(formValue['Name'],formValue['Password']);
            this.spinner=false;

          } catch (error) {
            this.spinner=false;
            this.LoginError='Server error please try again';
            console.log(JSON.stringify(error), formValue['Name'], formValue['Password']);
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
                console.log('Sign in successful!');
                this.authStatus = this.authService.isAuth;
                this.authService.User=login;
                
              } catch (error) {
               console.log(error) 
              } 
              this.router.navigate(['/Loading'])
              
            }
          ); 
        }
        else{
          this.LoginError='Invalid Password or Username';
        }
      }
      languageChanged(){// this function will be call by the function calling when we have to save this in cookies;
        this.translateConfigService.setLanguage(this.selectedLanguage);
      }



    //this part is just for the tests of multi scenario

    
  

}
