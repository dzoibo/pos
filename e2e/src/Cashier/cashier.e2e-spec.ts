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

 /*Scenario : search items successful
    Given the user launch the app and is connnected 
    when the user click on the Cashier link router
    and enter click on the search icon 
    and enter "malta" in the searchBar to search 
    then the list of all corresponding items are displayed in the slide */
    it('search successful',async()=>{
      await page.ClickId('btMenu');
      await page.ClickId('CashierLink');
      await page.ClickId('searchIcon');
      await page.clearElm('search');
      await page.sendkeyId('search','mal');
      expect(await page.getelm('slides')).toEqual(true);
    })


    /*
      Scenario : search items fail 
      Given the user launch the app and is connected and the drink to search is no in the system
      when the user click on the Cashier link router
      and enter click on the search icon 
      and enter the random string in the searchBar to search 
      then the message "no result for your search " is displayed
     */
      it('search items fail',async()=>{
        await page.ClickId('btMenu');
        await page.ClickId('CashierLink');
        await page.ClickId('searchIcon');
        await page.sendkeyId('search','sdff');
      })
    
     
      /*
      Scenario : display catalog all categories
      Given the user launch the app and is connected and the drink to search is no in the system
      when the user click on the Cashier link router
      and enter click on the catalog icon 
      then the scan button and the search bar are not longer displayed , the catalog filter is "all categories"  and the catalog  items are displayed  in the slide 
      */
      it('display catalog all categories',async()=>{
        await page.ClickId('btMenu');
        await page.ClickId('CashierLink');
        await page.ClickId('gridIcon');
        expect(await page.getelm('slides')).toEqual(true);
      })

      /*
      Scenario : display catalog beer
      Given the user launch the app and is connected and the drink to search is no in the system
      when the user click on the Cashier link router
      and enter click on the catalog icon 
      and select the beer categories
      then the scan button and the search bar are not longer displayed , the catalog filter is "beer"  and the beer  items are displayed  in the slide 
      */
      it('display catalog beer',async()=>{
        await page.ClickId('btMenu');
        await page.ClickId('CashierLink');
        await page.ClickId('gridIcon');
        await page.ClickId('catalogTrigger');
        await page.ClickId('Catalog1');
        expect(await page.getelm('slides')).toEqual(true);
        expect(await page.getTextid('GridItemName0')).toContain('33 Export');
        expect(await page.getTextid('GridItemName1')).toContain('Guiness');
        
      })


      /*Scenario : display catalog wine
        Given the user launch the app and is connected and the drink to search is no in the system
        when the user click on the Cashier link router
        and enter click on the catalog icon 
        then the scan button and the search bar are not longer displayed , the catalog filter is "wine"  and the wine  items are displayed  in the slide   */
        it('display catalog wine',async()=>{
          await page.ClickId('btMenu');
          await page.ClickId('CashierLink');
          await page.ClickId('gridIcon');
          await page.ClickId('catalogTrigger');
          await page.ClickId('Catalog2');
          expect(await page.getelm('slides')).toEqual(true);
          expect(await page.getTextid('GridItemName0')).toContain('El vino');
          expect(await page.getTextid('GridItemName1')).toContain('Baron De Madrid');
        })

        /*Scenario : display catalog juice and water
        Given the user launch the app and is connected and the drink to search is no in the system
        when the user click on the Cashier link router
        and enter click on the catalog icon 
        then the scan button and the search bar are not longer displayed , the catalog filter is "juice and water"  and the "Juice and water"  items are displayed  in the slide   */
        it('display catalog juice and water',async()=>{
          await page.ClickId('btMenu');
          await page.ClickId('CashierLink');
          await page.ClickId('gridIcon');
          await page.ClickId('catalogTrigger');
          await page.ClickId('Catalog3');
          expect(await page.getelm('slides')).toEqual(true);
          expect(await page.getTextid('GridItemName0')).toContain('Supermont');
          expect(await page.getTextid('GridItemName2')).toContain('Vitale');
  
        })


        /*
        Scenario : select items in the catalog 
        Given the user launch the app and is connected and the drink to search is no in the system
        when the user click on the Cashier link router
        and click on the catalog icon 
        and select one item 
        then all information about the item are displayded in the order details section and the amout of the items are initialize and the pay button are displayed,and the badge with the value 1 like label ared displayed  */
        it('select items in the catalog',async()=>{
          await page.ClickId('btMenu');
          await page.ClickId('CashierLink');
          await page.ClickId('gridIcon');
          await page.ClickId('image0');
          expect(await page.getelm('Total')).toEqual(true);
          expect(await page.getelm('Pay')).toEqual(true);
          expect(await page.getelm('orderItemsName0')).toEqual(true);
          expect(await page.getelm('orderItemsPrice0')).toEqual(true);
          expect(await page.getTextid('badge0')).toEqual("1");
        })

        /*
        Scenario : switch between items models 
        Given the user launch the app and is connected and the drink to search is no in the system
        when the user click on the Cashier link router
        and click on the catalog icon 
        and select one item
        and click on the button to switch items models
        then the model of the item set from "bottle" to "palette"  */
        it('switch between items models',async()=>{
          await page.ClickId('btMenu');
          await page.ClickId('CashierLink');
          await page.ClickId('gridIcon');
          await page.ClickId('image0');
          expect(await page.getelm('Total')).toEqual(true);
          expect(await page.getelm('Pay')).toEqual(true);
          expect(await page.getTextid('OrderItemModel0')).toEqual('Bottle');
          await page.ClickId('BtSwitchModel0');
          expect(await page.getTextid('OrderItemModel0')).toEqual('Palette');
        })



        /*Scenario : remove items 
        Given the user launch the app and is connected and the drink to search is no in the system
        when the user click on the Cashier link router
        and click on the catalog icon 
        and select one item
        and click on the ellipsis icons of the items details
        and click on the "delete"
        then the items are remove in the list and the amount is not longer displayed */
        it('remove items',async()=>{
          await page.ClickId('btMenu');
          await page.ClickId('CashierLink');
          await page.ClickId('gridIcon');
          await page.ClickId('image0');
          expect(await page.getelm('Total')).toEqual(true);
          expect(await page.getelm('Pay')).toEqual(true);
          expect(await page.getelm('orderItemsDetails0')).toEqual(true);
          await page.ClickId('ItemDelete0');
          expect(await page.getelm('orderItemsDetails0')).toEqual(false);
        })

       

        /*
        Scenario : increase quantity
        Given the user launch the app and is connected and the drink to search is no in the system
        when the user click on the Cashier link router
        and click on the catalog icon 
        and select one item 
        and increase the quantity of the items by clicking on the rounded + icon in the order details sections 
        then the quantity displayed set to 2 and the price double and the amont also become double
 */
        it('increase quantity',async()=>{
          await page.ClickId('btMenu');
          await page.ClickId('CashierLink');
          await page.ClickId('gridIcon');
          await page.ClickId('image0');
          expect(await page.getelm('Total')).toEqual(true);
          expect(await page.getelm('Pay')).toEqual(true);
          expect(await page.getTextid('qtItem0')).toEqual('1');
          await page.ClickId('btAdd0');
        })


        
  /*
  Scenario : increase quantity
  Given the user launch the app and is connected and the drink to search is no in the system
  when the user click on the Cashier link router
  and click on the catalog icon 
  and select one item 
  and increase the quantity of the items 2 times by clicking on the rounded + icon in the order details sections
  and decrease  the quantity of the items 1 time by clicking on the rounded - icon in the order details sections
  then the quantity displayed set to 2 and the price double and the amont also become double
  */

  it('increase quantity',async()=>{
    await page.ClickId('btMenu');
    await page.ClickId('CashierLink');
    await page.ClickId('gridIcon');
    await page.ClickId('image0');
    expect(await page.getelm('Total')).toEqual(true);
    expect(await page.getelm('Pay')).toEqual(true);
    await page.ClickId('btAdd0');
    await page.ClickId('btAdd0');
    expect(await page.getTextid('qtItem0')).toEqual('3');
    await page.ClickId('btRemove0');
    expect(await page.getTextid('qtItem0')).toEqual('2');
  })
afterEach(async()=>{
  //page.navigateTo();
  await global.logOut();
});

})
