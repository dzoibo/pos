import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' 
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SwiperModule } from 'swiper/angular';
import { CookieService } from 'ngx-cookie-service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GuardAvoidService } from './service/guard-avoid.service';
import { CashierComponent } from './cashier/cashier.component';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LoginService,OrderService,CatalogService } from 'poslibrary';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from './service/order.service';
//import { PayComponent } from './pay/pay.component';





const appRoutes: Routes = [
{ path: "Cashier", canActivate: [AuthGuardService],component: CashierComponent },
//{ path: "Pay", canActivate: [AuthGuardService],component: PayComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CashierComponent,
    //PayComponent
    
  ],
  entryComponents: [],  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    ScrollingModule,
    RouterModule.forRoot(appRoutes),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GuardAvoidService,
    BarcodeScanner,
    SQLite,
    SQLitePorter,
    LoginService,
    OrderService,
    OrdersService,
    CatalogService,
    CookieService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
