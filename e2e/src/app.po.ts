import { browser, by, element } from 'protractor';
import { ExpectedConditions } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  
  getelm(id:string): any {
    return element(by.id(id)).isPresent();
  }

  getText(id:string){
    const elm = element(by.id(id));
    return elm.getText();
  }
  ClickElm(id:string){
    var EC=ExpectedConditions;
    const elm=element(by.id(id));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    return elm.click();
  }
  sendKey(id:string,key:string){
    var elm=element(by.id(id));
    return elm.sendKeys(key);
  
  }
  clearElm(id:string){
    var elm=element(by.id(id));
    elm.clear();
  }
  
}
