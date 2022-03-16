import { browser, by, element } from 'protractor';
import { ExpectedConditions } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  getTextid(id:string){
    const elm = element(by.id(id));
    return elm.getText();
  }

  ClickId(id:string){
    var EC=ExpectedConditions;
    const elm=element(by.id(id));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    return elm.click();
  }
  getelm(name:string) {
    return element(by.id(name)).isPresent();
  }

  getText(name:string){
    const elm = element(by.name(name));
    return elm.getText();
  }
  sendKey(name:string,key:string){
    var elm=element(by.name(name));
    return elm.sendKeys(key);
  
  }
  
  clearElm(name:string){
    var EC=ExpectedConditions;
    
    var elm=element(by.name(name));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    elm.clear();
  }
  clearId(name:string){
    var EC=ExpectedConditions;
    var elm=element(by.id(name));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    elm.clear();
  }
  sendkeyId(name:string,key:string){
    var elm=element(by.id(name));
    return elm.sendKeys(key);
  }

  ClickElm(name:string){
    var EC=ExpectedConditions;
    const elm=element(by.name(name));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    return elm.click();
  }

  ClickType(type:string){
    var EC=ExpectedConditions;
    const elm = element(by.css("button[type=submit]"));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    return elm.click();
  }
  getColorId(id:string){
    var elm=element(by.id(id));
    var color:string="red";
    elm.getCssValue('background-color').then(function(bgColor) {
      color=bgColor;
    });
    return color;
  }
  ClickBycss(selector){
    var EC=ExpectedConditions;
    const elm=element(by.css(selector));
    browser.wait(EC.elementToBeClickable(elm), 3000);
    return elm.click();
  }
  

  async logIn(){
    await this.clearElm('ion-input-0');
    await this.sendKey('ion-input-0','medard@ranites.com');
    await this.clearElm('ion-input-1');
    await this.sendKey('ion-input-1','medard');
    await this.ClickId('loginSubmit');
    }
    
  async logOut(){
    var EC=ExpectedConditions;
    const btMenu=element(by.id('btMenu'));
    const signOut=element(by.id('signOut'));
    await browser.wait(EC.elementToBeClickable(btMenu),10000);
    btMenu.click();
    await browser.wait(EC.elementToBeClickable(signOut),10000);
    signOut.click();
  }
}
