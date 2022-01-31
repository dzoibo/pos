import { Component,OnInit,OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import{ User} from '../Models';
import { Router } from '@angular/router';


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
  Bartender!:User;
  authStatus:boolean;
  showPassword:boolean=false;
;  constructor(private formBuilder:FormBuilder,private router:Router, private authService:AuthService) {
    this.Bartender=new User('Barabas','User420'); 
  }
  ngOnInit(){
      this.initForm();
      this.authStatus=this.authService.isAuth;  
  }
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
  
  initForm() {
    this.loginForm = this.formBuilder.group({
      Name: ['',Validators.required],
      Password: ['',Validators.required],
    });
  }

    resetError(){
      this.NameError='';
      this.PasswordError='';
      this.LoginError='';
    }

    onSubmitForm(){
    
      this.resetError();
      const formValue = this.loginForm.value;
      var error1=false;
      var error2=false;
      
      if(formValue['Password']===null || formValue['Password']===''){
        this.PasswordError ="Enter password";
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
        return
      }
      else{
        if(formValue['Name']===this.Bartender.userName && formValue['Password']===this.Bartender.userPassword){
          this.authService.signIn().then(
            () => {
              console.log('Sign in successful!');
              this.authStatus = this.authService.isAuth;
              this.initForm()
      console.log(this.authService.isAuth);
      this.router.navigate(['Order']);
            }
          ); 
        }
        else{
          this.LoginError='Invalid Password or Username';
        }
        
      }
      
    }
    

}
