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

  
  /*Scenario:  login successfully
    Given the user launch the app 
    When Login display and the user enter his username  and his password and submit
    Then the user is connect and the Order's page is displayed */
    it('Login successfully', async() => {
      await page.clearElm('loginNames');
      await page.sendKey('loginNames','Barabas');
      await page.clearElm('loginPassword');
      await page.sendKey('loginPassword','User240');
      await page.ClickElm('loginSubmit');
      expect(await page.getText('orderP')).toContain('order works!');
    });

    /*Scenario:  login no user name 
    Given the user launch the app 
    When Login display and the user enter only  his password and submit
    Then the message 'no username' is displayed bellow the usernameinput in red */
    it('login no user name', async() => {
      await page.clearElm('loginPassword');
      await page.sendKey('loginPassword','User240');
      await page.ClickElm('loginSubmit');
      expect(await page.getText('idNameError')).toContain('Enter password');
    });

    /*Scenario:  login no password
    Given the user launch the app 
    When Login display and the user enter only  his username  and submit
    Then the message 'no password' is displayed in the passeword input in red*/
    it('Login successfully', async() => {
      await page.clearElm('loginName');
      await page.sendKey('loginName','Barabas');
      await page.ClickElm('loginSubmit');
      expect(await page.getText('idPasswordError')).toContain('Enter password');
    });

    /*Scenario:  login  invalid username or password
    Given the user launch the app 
    When Login display and the user enter iinvalid password or invalid username and submit the form
    Then the message 'invalid username or password' is displayed on the top of the form in red */

    it('Login successfully', async() => {
      await page.clearElm('loginName');
      await page.sendKey('loginName','Bobo');
      await page.clearElm('loginPassword');
      await page.sendKey('loginPassword','User240');
      await page.ClickElm('loginSubmit');
      expect(await page.getText('LoginError')).toContain('Invalid Password or Username');
    });
});
