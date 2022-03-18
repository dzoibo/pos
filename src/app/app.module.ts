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
import { AuthGuardService } from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GuardAvoidService } from './guard/guard-avoid.service';
import { CashierComponent } from './cashier/cashier.component';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LoginService,OrderService,CatalogService } from 'poslibrary';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { OrdersService } from './service/order.service';
import { HomePage } from './home/home.page';
import { PayComponent } from './pay/pay.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './service/translate-config.service';
import { DeactivateGuardGuard } from './guard/deactivate-guard.guard';
import { HomePageModule } from './home/home.module';
import { OrdersComponent } from './orders/orders.component';
import { Order } from './Models';
import { PrintService } from './service/print';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}



const appRoutes: Routes = [
{ path: "Cashier", canActivate: [AuthGuardService],canDeactivate:[DeactivateGuardGuard] ,component: CashierComponent },
//{ path: "Order",component: OrdersComponent },
{ path: "home", canActivate: [GuardAvoidService], component: CashierComponent },
{ path: "Pay", canActivate: [AuthGuardService],component: PayComponent },
{ path: "**", redirectTo:'home' },


];
@NgModule({
  declarations: [
    AppComponent,
    CashierComponent,
    PayComponent,
    OrdersComponent
    
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
    HomePageModule,
    SwiperModule,
    ScrollingModule,
    RouterModule.forRoot(appRoutes),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GuardAvoidService,
    DeactivateGuardGuard,
    BarcodeScanner,
    BluetoothSerial,
    SQLite,
    SQLitePorter,
    LoginService,
    OrderService,
    OrdersService,
    CatalogService,
    CookieService,
    PrintService
    ,
    TranslateConfigService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
