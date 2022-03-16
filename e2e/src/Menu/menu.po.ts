import { browser, by, element } from 'protractor';
import { ExpectedConditions } from 'protractor';

export class MenuPage {
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

  
}
