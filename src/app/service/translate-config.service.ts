//translate-config.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class  TranslateConfigService {

  constructor(
    private translate: TranslateService
  ) { }

  getDefaultLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }

  setLanguage(setLang) {
    console.log('language');
    this.translate.use(setLang);
  }

}