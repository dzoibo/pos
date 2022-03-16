
import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { OrdersService } from '../service/order.service';
import { Catalog,OrderItem,Item,Order, Slide, ItemModel } from '../Models';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { PopoverController } from '@ionic/angular';
import { IonSlides} from '@ionic/angular';
import { LoginService } from 'poslibrary';


@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
  
})
export class CashierComponent implements OnDestroy {
  @ViewChild('mySlider')  slides: IonSlides;
  selectedLeave : string = '';
  searchValue:string='';
  id:string="1";
  rama=['1','2','3'];
  noItems:string='';
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  idCatalog=1;
  Orders:Order[];
  Order:Order;  // the Order we are currently handling;
  Catalog:Catalog[];// variable to get the catalog comming frrom the service 
  template:{ // template to create several slide by dividing by different items group  
    id:number;
    items:Item[];
    }[]=[];
  slideSize=6; // variable to manage the size of the slide depending of the height of the screen 
  currentMenu='SCAN';
  CatalogSelected:Catalog;
  AllCatalog:Catalog


  constructor(private barcodeScanner: BarcodeScanner,private router:Router, private orderService:OrdersService,private route:ActivatedRoute,private popoverController:PopoverController, private log: LoginService) {
   
    this.Orders=this.orderService.Orders;
    this.Order=new Order();
    this.CatalogSelected=new Catalog();
   }
  ngOnDestroy(): void {
    this.Order=new Order();
  }
  
   async ionViewWillEnter() {
    console.log('init cashier');
    this.Catalog = [];
    await this.initCatalog();
    await this.getOrder();
    this.CatalogSelected=this.AllCatalog;// this function return the entier list of items in the app;
    this.getSize();
    this.showItem(this.CatalogSelected.CatalogItems,this.CatalogSelected.CatalogName);
    this.searchValue="";
  }
  
    
  


  async initCatalog(){
    await this.orderService.getCatalog(0,0).catch(err => console.log('get catalog', err));
    var data =await this.orderService.getCatalog(0,0);
    console.log('init Catalog', data)
    try {
        this.Catalog=data;
        console.log('catalog',this.Catalog);
        this.GetAllCatalog();
        console.log('all',this.AllCatalog)
        this.Catalog=this.Catalog.reverse();// we do this to push it like a first element in the table;
        this.Catalog.push(this.AllCatalog);
        this.Catalog=this.Catalog.reverse();
    } catch (error) {
      console.log('erreur',error)
    }
  }

  GetAllCatalog(){
    const AllItem :Item[]=[];
    for (const catalog of this.Catalog){
      for ( const item of catalog.CatalogItems){
        AllItem.push(item);
      }
    }
    const allCatalog=new Catalog();
    allCatalog.CatalogId=0;
    allCatalog.CatalogImage='';
    allCatalog.CatalogName="All categories";
    allCatalog.CatalogItems=AllItem;
    allCatalog.CatalogDescription='';
    this.AllCatalog= allCatalog;
  }

  swipeNext(){
    this.slides.slideNext();
  }
  swipePrev(){
    this.slides.slidePrev();
  }
  
   scan(){// question to come: what we are suppose to display if the user scan a bad code? ...
    this.barcodeScanner.scan().then(barcodeData => {
        console.log('Item Id', (barcodeData.text));
        var itemId:number= parseInt(JSON.parse(barcodeData.text));
        
        try {
          this.orderService.getCatalog(0,itemId).then((data)=>{
          var catalog:Catalog[];
          catalog=data;
          this.addItem(catalog[0].CatalogItems[0]);
          })
          this.scan();
        } 
        catch (error) {
          console.log(' Ce scan ne correspond à aucun produit ...')
        }
      }).catch(err => {
            console.log('Error scan : ', err);
     });
  }
 async setMenu(menuItem:string){
    if(menuItem==='grid'){
      await this.initCatalog;
      if(this.template.length===0){
        this.noItems='No items avalaible here for now ; you must refresh the stock';
      }
    }else{
      this.noItems='';
    }
    this.currentMenu=menuItem;
  }
  async ClosePopOver() {
    await this.popoverController.dismiss();
      }
  
 

  setCatalog(id:number){
    for (const catalog of this.Catalog){
      if(catalog.CatalogId===id){
        this.CatalogSelected=catalog;
      }
    }
    this.ClosePopOver();
  }
  



 showItem(list:Item[],name:string){
   this.noItems='';
   this.template=[];
   var slides=~~(list.length/this.slideSize);// now we know that slides content the number of table that we will have
   var rest =(list.length%this.slideSize); // if the rest is bigger than 0, we will recover all tha rest in another table and we will push ubn a new table 
   for (let i=0;i<slides ; i++){
   const vals = list.slice(this.slideSize*i,(this.slideSize*(i+1))); 
   const slide=new Slide(i+1,[]);
      for (const val of vals ){
        slide.items.push(val);
      }
      this.template.push(slide)
    }
    if(rest>0){
      const valsRest= list.slice(slides*this.slideSize,list.length);// we recover all the items that we had not selected before 
      const slide= new Slide(slides+1,[]);
      for (const val of valsRest ){
        slide.items.push(val);
      }
      while(slide.items.length<this.slideSize){// On fait ceci pour completer le nombre du dernier slide de meme que les autres ainsi on conservera notre sutructure de grille
        const empty:Item={
          ItemId:-1,
          ItemName:"",
          ItemPrice:0,
          ItemImage:"",
          ItemDescription:"",
          ItemModels:null,
          ItemProvider:"",

        }
        slide.items.push(empty);
      }
      this.template.push(slide);
    } 
    if(this.template.length===0 && name !=='search'){  
      this.noItems='No items avalaible here for now ; you must refresh the stock';
    }
    console.log('template',this.template);
 }

async getOrder(){//this function is to get the id of the order send by a router
 if(localStorage.getItem('Order')){
  var retrievedObject = localStorage.getItem('Order')
  this.Order=JSON.parse(retrievedObject)
 }else{
   try {
    this.Order.OrderId=await this.orderService.getNewOrderId();
   } catch (error) {
     console.log('error :', error);
     
   }
 }
   

}
addItem(newItem:Item){
  let present=false;
  for(let Item of this.Order.OrderItems){
    if(Item.Item.ItemId===newItem.ItemId){//it means that the Item is already present
      present=true;
    }
  }

  if(present){
    this.increaseQuantity(newItem.ItemId)
  }
  else{
    let newSelectedItem :OrderItem={
        Item:{
          ItemId:newItem.ItemId,
          ItemImage:newItem.ItemImage,
          ItemPrice:newItem.ItemPrice,
          ItemName:newItem.ItemName,
          ItemDescription:newItem.ItemDescription,
          ItemModels:newItem.ItemModels, 
          ItemProvider:''
          },
          ItemQuantity:1,
          ItemModel:newItem.ItemModels[0],// we will set this after adding the different modele fonctionnality.
    };
    this.Order.OrderItems.push(newSelectedItem)
  }
}
increaseQuantity(id:number){
  for(let item of this.Order.OrderItems){
    if(item.Item.ItemId===id){
      item.ItemQuantity++;
    }
  }
}
decreaseQuantity(id:number){
  for(let item of this.Order.OrderItems){
    if(item.Item.ItemId===id){
      if(item.ItemQuantity>1){
        item.ItemQuantity--;
      }
    }
  }
}
deleteItem(Item:Item){
  
  let index=-1;
  for(const item of this.Order.OrderItems){
    if(item.Item.ItemId===Item.ItemId){
      index= this.Order.OrderItems.indexOf(item,0);  
    }
  }
  this.Order.OrderItems.splice(index,1);
  this.ClosePopOver();
}
 getQuantity(id:number){
   try {
    for (const item of this.Order.OrderItems){
      if(item.Item.ItemId===id){
        return(item.ItemQuantity)
      }
    }
   } catch (error) {
     console.log(error);
   }
   
 }
 canSwitchModel(Models:ItemModel[]){
   if ( Models.length>1){
     return false;
   }
   else {
     return true;
   }
 }

 switchModels(orderItem:OrderItem){ // this function is to  switch between different model of item 
  try {
    var indexModel= orderItem.Item.ItemModels.indexOf(orderItem.ItemModel); // we start first by try to get acces to the index of the current model of the item
    var indexOrdeItem=this.Order.OrderItems.indexOf(orderItem);// now we get the position of the orderItem to set the model in the order.
    if(indexModel+1<orderItem.Item.ItemModels.length){
      this.Order.OrderItems[indexOrdeItem].ItemModel=orderItem.Item.ItemModels[indexModel+1];
    }
    else{   
      this.Order.OrderItems[indexOrdeItem].ItemModel=orderItem.Item.ItemModels[0];
    }
  } catch (error) {
    console.log('You can\'t switch');
  }
 }

 getTotal(){
  var total=0
  total=0;
  try 
  {
    for (const item of this.Order.OrderItems){
      const finalPrice=item.ItemModel.Price*item.ItemQuantity;
      total=total+finalPrice;
      }
      this.Order.OrderTotalAmount=total;
      return this.Order.OrderTotalAmount;
  } catch (error) {
    return 0
  }
  
 }

checkDisable(Item:OrderItem){
  if(Item.ItemQuantity>1){
    return true;
  }
  else{
    return false;
  }
}


 async doSearch(){
  await this.initCatalog(); // we refresh the catalog comming from the data base
    this.noItems='';
    this.template=[];
    if(this.searchValue.length===0){
      return 0
    }
    
    if(this.searchValue.length>0){
      var searchResult:Item[]=[];
      var AllItem=this.AllCatalog;
        for(const Item of AllItem.CatalogItems){
          if(Item.ItemName.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1){
            searchResult.push(Item);
          }
        }
      }

      if (searchResult.length>0){
        this.showItem(searchResult,'search');
        this.noItems="no";// this is just a rendom string use to manage the display in the view

      }
      else{
        this.noItems="no results for your search";
      }
   }
   
 
 
  getSize()
  {
    if (screen.width>=900&& screen.height>=700 ) {
      this.slideSize=20;
    }

    else if (screen.width>800 && screen.height>900){
      this.slideSize=20;
    }
    else if (screen.width>900){
      this.slideSize=10;
    }else if (screen.width>800 && screen.height<500){
      this.slideSize=10;
    }
    else {
      this.slideSize=8;
    }
    this.slideSize=6
  }
  
 
  choiceColor(id){
      if(this.CatalogSelected.CatalogId===id){
        return 'success';
      }else{
        return 'dark';
      }
    
  }

  
  truncate(input:string,max:number) { 
    if (input.length >=max && screen.width<900) {
       return input.substring(0, max) + '...';
    }
    else{
      return input;
    }
    
 }


 



 //fonction and propertie of the payment by cash

 Mode:string='CASH';
 Pay='null';// the state os the order about pay ; it can be 'null','pay'or 'valid'
 Payment:number=0;

  
 pay(){
  localStorage.setItem('Order', JSON.stringify(this.Order));
  this.router.navigate(['Pay']);
  
 }
  
}
