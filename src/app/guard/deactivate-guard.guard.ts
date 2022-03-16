import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate,currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
    return component.canDeactivate() ? 
      true: this.presentAlertConfirm();
  }

  constructor(private alertController:AlertController){

  }

  async presentAlertConfirm():Promise<boolean>{
    let choice ;
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'If you quit now all progress will be lost',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => resolveFunction(false)
        }, {
          text: 'Okay',
          
          id: 'confirm-button',
          handler: () => resolveFunction(true)
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data
  })
  await alert.present();
  return promise;
  }
}




