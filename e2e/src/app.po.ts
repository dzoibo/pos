import { browser, by, element } from 'protractor';
import { ExpectedConditions } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  
  
  /*the function bellow doesn't work on the ion element due to to the select by id 
  sendKey(id:string,key:string){
    var elm=element(by.id(id));
    return elm.sendKeys(key);

    getelm(id:string): any {
    return element(by.id(id)).isPresent();
  }
*/
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
  
}
