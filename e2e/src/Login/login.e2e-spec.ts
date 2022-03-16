import { browser } from 'protractor';
import { LoginPage } from './login.po';
import {AppPage} from '../helpers.po'

xdescribe('new App', () => {
  let page: LoginPage;
  let global: AppPage;

  beforeEach(() => {
    page = new LoginPage();
    global = new AppPage();
  });
  beforeAll(() => {
  
    browser.waitForAngularEnabled(false);
    global = new AppPage();
    page = new LoginPage();
    page.navigateTo();
    /* global.logIn(); we can't login because this tests is already fior the login so we are suppose to be no connect
      afterAll(()=>{ // we don't also need this because in the login there are only one tests to connect to the login
        global.logOut(); 
    }) */
  }) 
  

 
   
//LOGIN

    /*Scenario:  login no user name 
    Given the user launch the app 
    When Login display and the user enter only  his password and submit
    Then the message 'Enter Username' is displayed bellow the usernameinput in red 
    it('login no user name', async() => {
      await page.clearElm('ion-input-0');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-1','');
      await page.ClickId('loginSubmit');
      expect(await page.getelm('global_container')).toBeFalse;
      expect(await page.getTextid("idNameError")).toEqual("Enter Username");
    });*/

    /*Scenario:  login no password
    Given the user launch the app 
    When Login display and the user enter only  his username  and submit
    Then the message 'Enter Password' is displayed in the passeword input in red
    it('login no user password', async() => {
      await page.clearElm('ion-input-0');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-0','username');
      await page.ClickId('loginSubmit');
      expect(await page.getelm('global_container')).toBeFalse;
      expect(await page.getTextid("idPasswordError")).toEqual("Enter Password");
    });*/

    /*
    Scenario:  login  invalid username or password
    Given the user launch the app 
    When Login display and the user enter invalid password or invalid username and submit the form
    Then the message ' username or password' is displayed on the top of the form in red */
    it('login invalid user or password', async() => {
      await page.clearElm('ion-input-0');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-0','username');
      await page.sendKey('ion-input-1','password');
      await page.ClickId('loginSubmit');
      expect(await page.getTextid("Error")).toEqual("Invalid Password or Username");
    });

    /*
  Scenario:  login successfully
    Given the user launch the app 
    When Login display and the user enter his username  and his password and submit
    Then the user is connect and the Order's page is displayed */
    it('Login successfully', async() => {
      await page.clearElm('ion-input-0');
      await page.sendKey('ion-input-0','medard@ranites.com');
      await page.clearElm('ion-input-1');
      await page.sendKey('ion-input-1','medard');
      await browser.sleep(5000)
      await page.ClickId('loginSubmit');
      expect(await page.getelm('btMenu')).toEqual(true);
      await global.logOut();
      
    });
});


