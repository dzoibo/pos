import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderComponent } from './order/order.component';
import { QuickOrderComponent } from './quick-order/quick-order.component';
import { HomePage } from './home/home.page';
import { GuardAvoidService } from './service/guard-avoid.service';
import { SigninOnePage } from './signin-one/signin-one.page';



const appRoutes: Routes = [
{ path: 'Order', canActivate: [AuthGuardService],  component: OrderComponent },
{ path: "QuickOrder", canActivate: [AuthGuardService],  component: QuickOrderComponent},
{ path: "home", canActivate: [GuardAvoidService], component: OrderComponent },
{ path: "signUp",  component: SigninOnePage },
{ path: "**", redirectTo:'Order' },
];
@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    
  ],
  entryComponents: [],  
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GuardAvoidService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
