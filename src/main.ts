import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { filter, fromEvent } from 'rxjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
async function bootstrap(){
  const ngModuleRef= await platformBrowserDynamic().bootstrapModule(AppModule);
  const subscription= fromEvent<MessageEvent>(window,'message')
  .pipe(filter (event=>event.data?.reboostapModule==='home'))
  .subscribe(()=>{
    subscription.unsubscribe();
    ngModuleRef.destroy();
    bootstrap();
  })
}
bootstrap();
