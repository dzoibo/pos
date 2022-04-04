import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { GuardAvoidService } from '../guard/guard-avoid.service';
import { AuthGuardService } from '../guard/auth-guard.service';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule} from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule ,
  ],
  declarations: [HomePage],
  providers: [
    AuthGuardService,
    GuardAvoidService,
  ],
})
export class HomePageModule {}
