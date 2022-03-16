import { Component,OnInit,OnDestroy,ViewChild } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import{ User} from '../Models';
import { OrdersService } from '../service/order.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'poslibrary';


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
  @ViewChild('loginName') inputName  ;
  @ViewChild('loginPassword') inputPassword ;
  constructor(public loginService:LoginService, public menuCtrl: MenuController,private formBuilder:FormBuilder,private router:Router, private authService:AuthService,private orderService:OrdersService) {
   this.User=new User
    }
  
  ngOnInit(){
      this.initForm();
      this.authStatus=this.authService.isAuth; 
  }

  SubmitByEnter(){
     if(this.inputName.value.length>0){
       if(this.inputPassword.value.length>=6){
         console.log('uio')
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
     /* this.resetError();   all this part is no longuer relevant because the user can't longer submit the form without provide his userName and his password
      var error1=false;
      var error2=false;
      
      if(formValue['Password']===null || formValue['Password']===''){
        this.PasswordError ="Enter Password";
        var elem=document.getElementById('loginPassword') as HTMLInputElement;
        console.log('error 2');
        elem.focus();
        error2=true;
      }

      if(formValue['Name']===null || formValue['Name']===''){
        console.log(formValue['Name']);
        this.NameError="Enter Username";
        var elem=document.getElementById('loginName') as HTMLInputElement;
        error1=true;
      }

      if (error1 || error2){
        return 0
      }
      else */
      
        //var login=  await this.orderService.GetUser(formValue['Name'],formValue['Password']).catch(err => console.log('error', err));
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
            this.LoginError='Server error please try again';
            console.log(JSON.stringify(error), formValue['Name'], formValue['Password']);
            return false;
          }

        }
        
        if( login !== 'null' ){//'medard@ranites.com','medard'
          this.authService.signIn().then(
           async () => {
              
              this.initForm()
              this.LoginError='';
              try {
                this.User=new User
                login;
                console.log('Sign in successful!');
                this.authStatus = this.authService.isAuth;
                this.authService.User=login;
                this.authService.createCookies()
              } catch (error) {
               console.log(error) 
              }
              this.router.navigate(['Cashier']);
            }
          ); 
        }
        else{
          this.LoginError='Invalid Password or Username';
        }
        
      }
      
    

}
