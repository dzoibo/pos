import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  currentLink:string;
  status:boolean;
  constructor(private authService:AuthService, private router:Router) {}
  ngOnInit(){
    this.status=this.authService.isAuth;
  }
  signOut(){
    this.authService.signOut();
    this.status=this.authService.isAuth;
    this.router.navigate(['/home']);
    console.log('deconnecté');
  }

  setItem(item:string){
    this.currentLink=item;
    console.log('Activer',item)
  }
}
