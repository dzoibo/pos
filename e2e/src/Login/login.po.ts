import { browser, by, element, ProtractorExpectedConditions } from 'protractor';
import { ExpectedConditions } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }
  
  async getTextid(id:string){
    var EC=ExpectedConditions;
    const elm = element(by.id(id));
    await browser.wait(EC.presenceOf(elm),10000);
    return elm.getText();
  }

 async  ClickId(id:string){
    var EC=ExpectedConditions;
    const elm=element(by.id(id));
    await browser.wait(EC.elementToBeClickable(elm),10000);
    return elm.click();
  }
  async getelm(id:string) {
    var EC=ExpectedConditions;
    const elm = element(by.id(id));
    await browser.wait(EC.presenceOf(elm),10000);
    return elm.isPresent();
  }

  
  async sendKey(name:string,key:string){
    var elm=element(by.name(name));
    return elm.sendKeys(key);
  
  }
  
  async clearElm(name:string){
    var EC=ExpectedConditions;
    
    var elm=element(by.name(name));
    await browser.wait(EC.elementToBeClickable(elm),10000);
    elm.clear();
  }
  async clearId(name:string){
    var EC=ExpectedConditions;
    var elm=element(by.id(name));
    await browser.wait(EC.elementToBeClickable(elm),10000);
    elm.clear();
  }
     sendkeyId(name:string,key:string){
    var elm=element(by.id(name));
    return elm.sendKeys(key);
  }

  async ClickElm(name:string){
    var EC=ExpectedConditions;
    const elm=element(by.name(name));
    await browser.wait(EC.elementToBeClickable(elm),10000);
    return elm.click();
  }
  
}
