import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  beforeAll(() => {
  
    browser.waitForAngularEnabled(false);
    page = new AppPage();
    page.navigateTo();
  })

  

    /*Scenario:  login no user name 
    Given the user launch the app 
    When Login display and the user enter only  his password and submit
    Then the message 'Enter Username' is displayed bellow the usernameinput in red */
    it('login no user name', async() => {
      await page.clearElm('ion-input-0');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-1','');
      await page.ClickId('loginSubmit');
      expect(await page.getelm('global_container')).toBeFalse;
      expect(await page.getTextid("idNameError")).toEqual("Enter Username");
    });

    /*Scenario:  login no password
    Given the user launch the app 
    When Login display and the user enter only  his username  and submit
    Then the message 'Enter Password' is displayed in the passeword input in red*/
    it('login no user password', async() => {
      await page.clearElm('ion-input-0');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-0','username');
      await page.ClickId('loginSubmit');
      expect(await page.getelm('global_container')).toBeFalse;
      expect(await page.getTextid("idPasswordError")).toEqual("Enter password");
    });

    /*Scenario:  login  invalid username or password
    Given the user launch the app 
    When Login display and the user enter invalid password or invalid username and submit the form
    Then the message ' username or password' is displayed on the top of the form in red */
    it('login no user password', async() => {
      await page.clearElm('ion-input-0');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-0','username');
      await page.sendKey('ion-input-1','password');
      await page.ClickId('loginSubmit');
      expect(await page.getelm('global_container')).toBeFalse;
      expect(await page.getTextid("loginError")).toEqual("Invalid Password or Username");
    });

    /*
  Scenario:  login successfully
    Given the user launch the app 
    When Login display and the user enter his username  and his password and submit
    Then the user is connect and the Order's page is displayed */
    it('Login successfully', async() => {
      await page.clearElm('ion-input-0');
      await page.sendKey('ion-input-0','Barabas');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-1','User420');
      await page.ClickId('loginSubmit');
      expect(await page.getelm('global_container')).toEqual(true);
      
    });
});
