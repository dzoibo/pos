import { browser } from 'protractor';
import { MenuPage } from './menu.po';
import {AppPage} from '../helpers.po'

xdescribe('new App', () => {
  let page: MenuPage;
  let global: AppPage;

  beforeEach(() => {
    page = new MenuPage();
    global = new AppPage();
  });
  beforeAll(() => {
  
    browser.waitForAngularEnabled(false);
    global = new AppPage();
    page = new MenuPage();
    page.navigateTo();
    global.logIn();
 })

 
  afterAll(async()=>{
       global.logOut();
  })

 /*

    MENU VIEW 
    Scenario: display menu
    Given the user launch the app 
    when click on the menu button
    Then the user avatar and user name are displayed  with the all router link and the log out icon  */
    it ('displayMenu',async()=>{
        await page.ClickId('btMenu');
        expect(await page.getelm('userAvatar')).toEqual(true);
        expect(await page.getelm('signOut')).toEqual(true);
        expect(await page.getelm('OrderLink')).toEqual(true);
        expect(await page.getelm('CashierLink')).toEqual(true);
        expect(await page.getelm('CatalogLink')).toEqual(true);
        expect(await page.getelm('AboutLink')).toEqual(true);
  
      });
});


