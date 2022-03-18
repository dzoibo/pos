import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { GuardAvoidService } from '../guard/guard-avoid.service';
import { AuthGuardService } from '../guard/auth-guard.service';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../service/translate-config.service';
import { DeactivateGuardGuard } from '../guard/deactivate-guard.guard';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule .forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [HomePage],
  providers: [
    AuthGuardService,
    GuardAvoidService,
    TranslateConfigService
  ],
})
export class HomePageModule {}
