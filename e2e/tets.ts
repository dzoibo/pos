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

  
//LOGIN

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
    it('login no user or password', async() => {
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

    /*

    MENU VIEW 
    Scenario: display menu
    Given the user launch the app 
    when click on the menu button
    Then the user avatar and user name are displayed  with the all router link and the log out icon  */
    it ('displayMenu',async()=>{
      
      await browser.sleep(5000);
      await page.ClickId('btMenu');
      expect(await page.getelm('userAvatar')).toEqual(true);
      expect(await page.getelm('signOut')).toEqual(true);
      expect(await page.getelm('cashierMenu')).toEqual(true);
      expect(await page.getelm('placeMenu')).toEqual(true);
      expect(await page.getelm('orderMenu')).toEqual(true);
      expect(await page.getelm('userMenuName')).toEqual(true);
      await page.ClickId('CloseMenu');
  

    });
    /*
    CASHIER VIEW 
    Scenario : display Cashier view 
    Given the user launch the app and is connnected
    when the user click on the Cashier link router 
    Then the order view is displayed wuth  the catalog section; the search bar , the drink view section with the beer button selected , the price details section and the footer section */
   

    it('display Cashier view',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');

      expect (await page.getelm('catalogTitle')).toBe(true);
      expect (await page.getelm('searchbar')).toEqual(true);
      expect (await page.getelm('titleCol')).toBe(true);
      expect (await page.getelm('bt1')).toEqual(true);
      expect (await page.getelm('bt2')).toEqual(true);
      expect (await page.getelm('bt3')).toEqual(true);
      expect (await page.getelm('bt4')).toEqual(true);
      expect (await page.getelm('bt5')).toEqual(true);
      expect (await page.getelm('next')).toEqual(true);
      expect (await page.getColorId('bt1')==='#92949c');
      expect (await page.getelm('image1')).toEqual(true);
      expect (await page.getelm('image2')).toEqual(true);
      expect (await page.getelm('image3')).toEqual(true);
      expect (await page.getelm('image4')).toEqual(true);
      expect (await page.getelm('image5')).toEqual(true);
      expect (await page.getelm('image6')).toEqual(true);
      expect (await page.getelm('image7')).toEqual(true);
      expect (await page.getelm('image8')).toEqual(true);
      expect (await page.getelm('image15')).toEqual(true);
      expect (await page.getelm('image9')).toEqual(true);
      expect (await page.getelm('detailsTitle')).toEqual(true);
      expect (await page.getelm('totalSection')).toEqual(true);
    }) 
    /*
    Scenario : search drink succefully
    Given the user launch the app and is connnected and the drink to search is in the system
    when the user click on the Cashier link router 
    and enter a string to search in the search bar 
    then all the drink that contain that string in their name are displayed 
    */
   it('Search drink successfuly',async()=>{
     await browser.sleep(3000);
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.clearId('searchbar');
      await page.sendkeyId('searchbar','malta');      
      expect(await page.getelm('image0')).toEqual(true);
      expect(await page.getelm('image1')).toEqual(true);
      expect(await page.getelm('image2')).toEqual(true);
      expect(await page.getelm('image3')).toEqual(true);
    })
    /*
    Scenario : search drink succefully
    Given the user launch the app and is connnected and the drink to search is in the system
    when the user click on the Cashier link router 
    and enter a string to search in the search bar 
    then all the drink that contain that string in their name are displayed 
    */
   
    it('Search drink fail',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');
      await page.clearId('searchbar');
      await page.sendkeyId('searchbar','Regal');      
      expect(await page.getTextid('noBeer')).toEqual('no results for your search');
    })

     /*Scenario : change catalog:the catalog contain drink
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and the user click on wine button of catalog
    then all the drink who is contain in that catalog are displayed
    */

    it('change catalog : The catalog contain a drink',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');
      await page.clearId('bt3');    
      expect(await page.getelm('image0')).toEqual(true);
      expect(await page.getelm('image1')).toEqual(true);
      expect(await page.getelm('image2')).toEqual(true);
      expect(await page.getelm('image3')).toEqual(true);
    })
    
    /*Scenario : change catalog:the catalog does not contain drink
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and the user click on wine button of catalog
    then all the drink who is contain in that catalog are displayed
    */
    it('change catalog : The catalog contain a drink',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');
      await page.clearId('bt3');    
      expect(await page.getTextid('noBeer')).toEqual('No Whisky avalaible for now ; you must refresh the stock');  
    })


    /*Scenario : show next catalog menu
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and the user click to the arrow next
    then all the current catalog are replaced by the next 
    */
    it('show next catalog menu',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');
      await page.clearId('next');    
      expect (await page.getelm('bt6')).toEqual(true);
      expect (await page.getelm('bt7')).toEqual(true);
      expect (await page.getelm('bt8')).toEqual(true);
      expect (await page.getelm('bt9')).toEqual(true);
      expect (await page.getelm('bt9')).toEqual(true);
    })

    /*Scenario : show previous catalog menu
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and the user click to the arrow next
    and click to the previous catalog
    then the previous catalog can be displayed
    */
    it('show next catalog menu',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');
      await page.clearId('next');    
      await page.clearId('next');    
      expect (await page.getelm('bt1')).toEqual(true);
      expect (await page.getelm('bt2')).toEqual(true);
      expect (await page.getelm('bt3')).toEqual(true);
      expect (await page.getelm('bt4')).toEqual(true);
      expect (await page.getelm('bt5')).toEqual(true);
    })

    /*Scenario : add drink
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and click to the two first image to slect the two first drink
    then badge is displayed with the quantity and the drink is added in the orderlist section section and the total is set   */
    it('add drink',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');  
      await page.ClickId('image0');
      await page.ClickId('image1');
      expect (await page.getelm('orderItem0')).toEqual(true);
      expect (await page.getelm('orderItem1')).toEqual(true);
      expect (await page.getTextid('totalPrice')).toEqual('1500');
      expect (await page.getTextid('badge0')).toEqual('1');
      expect (await page.getTextid('badge1')).toEqual('1');
      });

    /*Scenario : increase quatity
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and click to the first image 
    and click to the button add of the orderList section
    then badge is displayed with the number 2 like label  
    and the items also have a number two between the button add 
    and the button remove and the price is also increase   */
    it('increase quantity',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');  
      await page.ClickId('image0');
      await page.ClickId('btAdd0');
      expect (await page.getelm('orderItem0')).toEqual(true);
      expect (await page.getTextid('totalPrice')).toEqual('1500');
      expect (await page.getTextid('badge0')).toEqual('2');
      expect (await page.getTextid('number0')).toEqual('2');
      });  
      
      
       /*Scenario :decrease quatity
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and click to the first image 
    and click to the button add
    and click to the button remove  of the orderList section
    then badge is displayed with the number 1 like label  
    and the items also have a number 1 between the button add 
    and the button remove and the price is decrease   */
    it('increase quantity',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');  
      await page.ClickId('image0');
      await page.ClickId('btAdd0');
      expect (await page.getelm('orderItem0')).toEqual(true);
      expect (await page.getTextid('totalPrice')).toEqual('1500');
      expect (await page.getTextid('badge0')).toEqual('2');
      expect (await page.getTextid('number0')).toEqual('2');
      await page.ClickId('btRemove0');
      expect (await page.getelm('orderItem0')).toEqual(true);
      expect (await page.getTextid('totalPrice')).toEqual('750');
      expect (await page.getTextid('badge0')).toEqual('1');
      expect (await page.getTextid('number0')).toEqual('1');
      });  

      
       /*Scenario :delete order items 
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router 
    and click to the first image 
    and click to the delete icon  of the new item in the orderList section
    then the corresponding items and the badge are not longer displayed
    and the total price is 0  */
    it('delete order items',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('cashierMenu');
      await page.ClickId('cashierMenu');  
      expect (await page.getelm('orderItem0')).toEqual(true);
      expect (await page.getTextid('totalPrice')).toEqual('750');
      expect (await page.getTextid('badge0')).toEqual('1');
      expect (await page.getTextid('number0')).toEqual('1');
      await page.ClickId('trash0');
      expect (await page.getelm('orderItem0')).toEqual(false);
      expect (await page.getelm('badge0')).toEqual(false);
      });  
      

       /*Scenario :display items of place view 
    Given the user launch the app and is connected 
    when the user click on the place link router 
    then all floors are displayed with the different table for each of them 
    */
    it('display items of place view UI',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('placeMenu');
      await page.ClickId('placeMenu');  
      expect (await page.getelm('floor0')).toEqual(true);
      expect (await page.getelm('table_table1')).toEqual(true);
      expect (await page.getelm('table_badge1')).toEqual(true);
      expect (await page.getelm('table_table2')).toEqual(true);
      expect (await page.getelm('table_badge2')).toEqual(true);
      expect (await page.getelm('table_table3')).toEqual(true);
      expect (await page.getelm('table_badge3')).toEqual(true);
      expect (await page.getelm('table_floor2')).toEqual(true);
      expect (await page.getelm('table_floor3')).toEqual(true);
      expect (await page.getelm('table_floor4')).toEqual(true);
    });  

     /*Scenario :hide floor 
    Given the user launch the app and is connected 
    when the user click on the place link router 
    and click on the hide icon of the floor1
    then the content of the floor1 is no longer displayed and it's empty
    */
    it('hide floor',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('placeMenu');
      await page.ClickId('placeMenu');  
      expect (await page.getelm('floor0')).toEqual(true);
      expect (await page.getelm('table_table1')).toEqual(true);
      expect (await page.getelm('table_badge1')).toEqual(true);
      expect (await page.getelm('table_table2')).toEqual(true);
      expect (await page.getelm('table_badge2')).toEqual(true);
      expect (await page.getelm('table_table3')).toEqual(true);
      expect (await page.getelm('table_badge3')).toEqual(true);
      await page.ClickId('hideIcon');  
      expect (await page.getTextid('orderList0')).toEqual('');// it means that the content of the floor is empty
    });  
  
      /*Scenario :hide floor 
    Given the user launch the app and is connected 
    when the user click on the place link router 
    and click on the hide icon of the floor1
    and click to the show icon f the floor 1
    then the content of the floor1 is displayed
    */
    it('show floor',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('placeMenu');
      await page.ClickId('placeMenu');  
      expect (await page.getelm('floor0')).toEqual(true);
      expect (await page.getelm('table_table1')).toEqual(true);
      expect (await page.getelm('table_badge1')).toEqual(true);
      expect (await page.getelm('table_table2')).toEqual(true);
      expect (await page.getelm('table_badge2')).toEqual(true);
      expect (await page.getelm('table_table3')).toEqual(true);
      expect (await page.getelm('table_badge3')).toEqual(true);
      await page.ClickId('hideIcon');  
      expect (await page.getTextid('orderList0')).toEqual('');
      await page.ClickId('showIcon'); 
      expect (await page.getelm('table_table1')).toEqual(true);
      expect (await page.getelm('table_badge1')).toEqual(true);
      expect (await page.getelm('table_table2')).toEqual(true);
      expect (await page.getelm('table_badge2')).toEqual(true);
      expect (await page.getelm('table_table3')).toEqual(true);
      expect (await page.getelm('table_badge3')).toEqual(true); 

    }); 


 /*ORDER VIEW */
 
 
 
 /*Scenario: Display Order all
Given  The user has launch the app and is connected 
 When the user click on the menu button and click on the Order router link in the menu 
 Then the Orders view is displayed with all the orders of the table selected  */

 it('Display order view',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  expect (await page.getelm('filters')).toEqual(true);
  expect (await page.getelm('place-button')).toEqual(true);
  expect (await page.getelm('statut-button')).toEqual(true);
  expect (await page.getelm('orderItem4')).toEqual(true);
  expect (await page.getelm('badge4')).toEqual(true);
  expect (await page.getelm('orderItem3')).toEqual(true);
  expect (await page.getelm('badge3')).toEqual(true);
  expect (await page.getelm('orderItem2')).toEqual(true);
  expect (await page.getelm('badge2')).toEqual(true);
  expect (await page.getelm('orderItem1')).toEqual(true);
  expect (await page.getelm('badge1')).toEqual(true);

 });





/*Scenario: Display Order list filtering by the status : Open
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select the filter Open
 Then the Orders view is displayed with all the orders of the table Opened

*/

it('Display order list filtering by status:Open',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('statut-button');
  await page.ClickId('Open');
  expect (await page.getTextid('badge2')).toEqual('Open');
  expect (await page.getelm('orderItem2')).toEqual(true);
  expect (await page.getelm('orderItem4')).toEqual(false);
  expect (await page.getelm('badge4')).toEqual(false);
  expect (await page.getelm('orderItem3')).toEqual(false);
  expect (await page.getelm('badge3')).toEqual(false);

 });

/*Scenario: Display Order list filtering by the status : new
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select the filter new
 Then the Orders view is displayed with all the new table
*/
it('Display order list filtering by status:new',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('statut-button');
  await page.ClickId('New');
  expect (await page.getTextid('badge4')).toEqual('New');
  expect (await page.getelm('orderItem4')).toEqual(true);
  expect (await page.getelm('orderItem1')).toEqual(false);
  expect (await page.getelm('badge1')).toEqual(false);
  expect (await page.getelm('orderItem3')).toEqual(false);
  expect (await page.getelm('badge3')).toEqual(false);
 });

/*
Scenario: Display Order list filtering by the status : on hold
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select the filter on hold
 Then the Orders view is displayed with all on hold the orders  
table
*/
it('Display order list filtering by status:On hold',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('statut-button');
  await page.ClickId('On hold');
  expect (await page.getTextid('badge3')).toEqual('On hold');
  expect (await page.getelm('orderItem3')).toEqual(true);
  expect (await page.getelm('orderItem4')).toEqual(false);
  expect (await page.getelm('badge4')).toEqual(false);
  expect (await page.getelm('orderItem2')).toEqual(false);
  expect (await page.getelm('badge2')).toEqual(false);
 });
/*
Scenario: Display Order list filtering by the status : started
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select the filter started
 Then the Orders view is displayed with all the started orders are displayed 
*/

it('Display order list filtering by status:started',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('statut-button');
  await page.ClickId('Started');
  expect (await page.getTextid('badge1')).toEqual('Started');
  expect (await page.getelm('orderItem1')).toEqual(true);
  expect (await page.getelm('orderItem4')).toEqual(false);
  expect (await page.getelm('badge4')).toEqual(false);
  expect (await page.getelm('orderItem3')).toEqual(false);
  expect (await page.getelm('badge3')).toEqual(false);
 });
/*


/*
Scenario: Display Order list filtering by the status : Closed
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select the filter Closed
 Then the Orders view is displayed with all the Closed orders are displayed 
*/

it('Display order list filtering by status: Closed',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('statut-button');
  await page.ClickId('Closed');
  expect (await page.getTextid('badge1')).toEqual('Closed');
  expect (await page.getelm('orderItem1')).toEqual(true);
  expect (await page.getelm('orderItem4')).toEqual(false);
  expect (await page.getelm('badge4')).toEqual(false);
  expect (await page.getelm('orderItem3')).toEqual(false);
  expect (await page.getelm('badge3')).toEqual(false);
 });

 /*
Scenario: Display Order list filtering by the table
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select a table in the filter table
and select a table
 Then the Orders view is displayed with all the orders of that table are displayed 
table*/

it('Display order list filtering by table',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('table-button');
  await page.ClickId('table1');
  expect (await page.getelm('orderItem1')).toEqual(true);
  expect (await page.getelm('orderItem4')).toEqual(false);
  expect (await page.getelm('orderItem3')).toEqual(false);
  expect (await page.getelm('orderItem2')).toEqual(false);
  expect (await page.getelm('Item')).toEqual(false);

 });

/*

Scenario: Display Order list filtering by the table: no order corresponding
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and select the filter Open in the status filter
and select a table without order open in the filter table
and select a table
 Then the Orders view is displayed with all the message no order 
    */
 it('Display order list : no table',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('table-button');
  await page.ClickId('table1');
  await page.ClickId('statut-button');
  await page.ClickId('open');
  expect (await page.getTextid('noOrder')).toEqual('no Order');
  expect (await page.getelm('orderItem1')).toEqual(false);
  expect (await page.getelm('orderItem4')).toEqual(false);
  expect (await page.getelm('orderItem3')).toEqual(false);
  expect (await page.getelm('orderItem2')).toEqual(false);
  expect (await page.getelm('Item')).toEqual(false);

 });

 /*Scenario: Select an order 
Given  The user has launch the app and is connected 
 When the user click on the menu button 
and click on the Order router link in the menu  
and click select a order order one  by clicking on it 
 Then the user is redirect to the cashier view and all information about the order are diplayed */

 it('Display order list : no table',async()=>{
  await page.ClickId('btMenu');
  await page.ClickId('orderMenu');
  await page.ClickId('orderMenu');  
  await page.ClickId('orderItem1');

  expect (await page.getelm('catalogTitle')).toBe(true);
      expect (await page.getelm('searchbar')).toEqual(true);
      expect (await page.getTextid('titleCol')).toContain('Catalog');
      expect (await page.getelm('bt1')).toEqual(true);
      expect (await page.getelm('bt2')).toEqual(true);
      expect (await page.getelm('bt3')).toEqual(true);
      expect (await page.getelm('bt4')).toEqual(true);
      expect (await page.getelm('bt5')).toEqual(true);
      expect (await page.getelm('next')).toEqual(true);
      expect (await page.getColorId('bt1')==='#92949c');
      expect (await page.getelm('image1')).toEqual(true);
      expect (await page.getelm('image2')).toEqual(true);
      expect (await page.getelm('image3')).toEqual(true);
      expect (await page.getelm('image4')).toEqual(true);
      expect (await page.getelm('image5')).toEqual(true);
      expect (await page.getelm('image6')).toEqual(true);
      expect (await page.getelm('image7')).toEqual(true);
      expect (await page.getelm('image8')).toEqual(true);
      expect (await page.getelm('image15')).toEqual(true);
      expect (await page.getelm('image9')).toEqual(true);
      expect (await page.getelm('detailsTitle')).toEqual(true);
      expect (await page.getTextid('detailsTitle')).toContain('order1');
      expect (await page.getelm('totalSection')).toEqual(true);

 });
 
});


