import { browser } from 'protractor';
import { CashierPage } from './cashier.po';
import {AppPage} from '../helpers.po'

describe('new App', () => {
  let page: CashierPage;
  let global: AppPage;

  beforeEach( async () => {
    page = new CashierPage();
    page.navigateTo();
    global = new AppPage();
    await  global.logIn();
  });
  beforeAll(() => {
  
    browser.waitForAngularEnabled(false);
 })

 
  

  /*
  Scenario: display Cashier view
     Given the category 'Category 1' exists in the system
    when the user click on the Cashier link router
    Then the order view is displayed with  the scan button;  the sarch icon and the catalog icon ,and the order id and the total section and the scan button selected 
   */
    it('display Cashier view',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('CashierLink');
      expect(await page.getelm('sOrderId')).toEqual(true);
      expect(await page.getelm('searchIcon')).toEqual(true);
      expect(await page.getelm('gridIcon')).toEqual(true);
      expect(await page.getelm('scanIcon')).toEqual(true);
      expect(await page.getelm('btScan')).toEqual(true);
      expect(await page.getColor('footer')).toEqual('rgba(44, 173, 47, 1)');
      expect(await page.getelm('catalogLabel')).toEqual(true);
    })




/*
    Scenario : display search bar
    Given the user launch the app and is connected
    when the user click on the Cashier link router
    and click on the search icon 
    then the scan button and the search icon are not longer displayed and the search bar is displayed
*/
it('display search successful',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('CashierLink');
  await page.ClickId('searchIcon');
  expect(await page.getelm('search')).toEqual(true);
})


afterEach(async()=>{
  //page.navigateTo();
  await global.logOut();
  await browser.sleep(2000)
});

})
