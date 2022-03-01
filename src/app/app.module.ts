import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SwiperModule } from 'swiper/angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Routes,RouterModule,RouterLinkActive } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderComponent } from './order/order.component';
import { QuickOrderComponent } from './quick-order/quick-order.component';
import { GuardAvoidService } from './service/guard-avoid.service';
import { SigninOnePage } from './signin-one/signin-one.page';
import { PlaceComponent } from './place/place.component';
import { PayComponent } from './pay/pay.component';
import {Ng2TelInputModule} from 'ng2-tel-input';



const appRoutes: Routes = [
{ path: 'Order',  component: OrderComponent },
{ path: 'Order/:id',  component:QuickOrderComponent },
{ path: "QuickOrder",   component: QuickOrderComponent},
{ path: "home", canActivate: [GuardAvoidService], component: OrderComponent },
{ path: "Place", /*canActivate: [GuardAvoidService], */  component: PlaceComponent },
{ path: "Pay", /*canActivate: [GuardAvoidService], */  component: PayComponent },
{ path: "signUp",  component: SigninOnePage },
{ path: "**", redirectTo:'Order' },
];
@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    PlaceComponent,
    QuickOrderComponent,
    PayComponent,
    
    
  ],
  entryComponents: [],  
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    ScrollingModule,
    Ng2TelInputModule,
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
