
import { Component, OnInit,OnDestroy, ViewChild,HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../guard/deactivate-guard.guard';
import { Router,ActivatedRoute } from '@angular/router';
import { OrdersService } from '../service/order.service';
import { Catalog,OrderItem,Item,Order, Slide, ItemModel } from '../Models';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { PopoverController } from '@ionic/angular';
import { IonSlides} from '@ionic/angular';
import { LoginService } from 'poslibrary';
import { AuthService } from '../guard/auth.service';


@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
  
})
export class CashierComponent implements ComponentCanDeactivate,OnInit {

   

   
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
  Orders:Order[]=[];
  Order:Order;  // the Order we are currently handling;
  Catalog:Catalog[];// variable to get the catalog comming frrom the service 
  template:{ // template to create several slide by dividing by different items group  
    id:number;
    items:Item[];
    }[]=[];
  slideSize=6; // variable to manage the size of the slide depending of the height of the screen 
  currentMenu='SCAN';
  CatalogSelected:Catalog;
  AllCatalog:Catalog;
  goToPay:boolean;
  permission:string;
  OrderIsSelected;//  this property is using only in the cashier scenario to know if we have already select and order
  orderFromSeller:boolean;//this property is to handle the pop up of the orders list 
  constructor( private authService:AuthService, private barcodeScanner: BarcodeScanner,private router:Router, private orderService:OrdersService,private route:ActivatedRoute,private popoverController:PopoverController, private log: LoginService) {
    this.Order=new Order();
    this.CatalogSelected=new Catalog();
    this.permission=this.authService.permission;
    console.log(this.permission);
   }
  
   ngOnInit(): void {
    this.OrderIsSelected=false;
   }
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if ( this.Order!==null){
      if(this.Order.OrderTotalAmount>0 && this.goToPay===false){
        return false;
      }else{
        return true
      }
    }else{
      return true;
    }
  }
   async ionViewWillEnter() {
    this.getOrderList();
    this.Catalog = [];
    await this.initCatalog();
    await this.initOrder();
    this.CatalogSelected=this.AllCatalog;// this function return the entier list of items in the app;
    this.getSize();
    this.showItem(this.CatalogSelected.CatalogItems,this.CatalogSelected.CatalogName);
    this.searchValue="";
    this.goToPay=false;
    this.orderFromSeller=false;
  }
  
  async ionViewWillLeave() {
    this.Order=new Order();
    this.currentMenu='SCAN';
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
    if(this.permission==='cashier'){
      return false;
    }
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

async initOrder(){
 
 if(this.permission==='seller' || this.permission==='cashier & seller'){// in each of these cases the user want to create a new order
   try 
   {
    this.Order.OrderId=await this.orderService.getNewOrderId();
   } catch (error) {
     console.log('error :', error); 
   }
 }
else{
    // we are in the cashier scenario and this means that one order is selected
      var retrievedObject = localStorage.getItem('Order')
      this.Order=JSON.parse(retrievedObject)
      if(this.Order!==null){
        console.log(this.Order,'yo');
        this.OrderIsSelected=true;
      }else{
        console.log(this.Order);
      }
  }
  console.log(this.OrderIsSelected);
  
}

   
addItem(newItem:Item){
  if(this.permission==='cashier'){
    return false;
  }
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
          ItemPrice:newItem.ItemModels[0].Price,
          ItemName:newItem.ItemName,
          ItemDescription:newItem.ItemDescription,
          ItemModels:newItem.ItemModels, 
          ItemProvider:''
          },
          ItemQuantity:1,
          ItemModel:newItem.ItemModels[0].Model,
    };
    var reverse=this.Order.OrderItems.reverse()//we do this the manipulation to add items at the top
    reverse.push(newSelectedItem);
    this.Order.OrderItems=reverse.reverse()
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
  if(this.permission==='cashier'){
    return false;
  }
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
   console.log(Models)
   if ( Models.length>1){
     return false;
   }
   else {
     return true;
   }
 }

 switchModels(orderItem:OrderItem){ // this function is to  switch between different model of item 
  var Model={
    Model:orderItem.ItemModel,
    Price:orderItem.Item.ItemPrice}
  try {
    var indexModel:number=-1;
    for (let i=0;i<orderItem.Item.ItemModels.length;i++){
      if(orderItem.Item.ItemModels[i].Model===orderItem.ItemModel && orderItem.Item.ItemModels[i].Price===orderItem.Item.ItemPrice ){
         indexModel=i
      }
    }
    var indexOrdeItem=this.Order.OrderItems.indexOf(orderItem);// now we get the position of the orderItem to set the model in the order.
    console.log(indexModel);
    console.log(indexOrdeItem);
    console.log(Model);
    console.log(orderItem.Item.ItemModels);
    if(indexModel+1<orderItem.Item.ItemModels.length){
      this.Order.OrderItems[indexOrdeItem].ItemModel=orderItem.Item.ItemModels[indexModel+1].Model;
      this.Order.OrderItems[indexOrdeItem].Item.ItemPrice=orderItem.Item.ItemModels[indexModel+1].Price;
    }
    else{   
      this.Order.OrderItems[indexOrdeItem].ItemModel=orderItem.Item.ItemModels[0].Model;
      this.Order.OrderItems[indexOrdeItem].Item.ItemPrice=orderItem.Item.ItemModels[0].Price;
    }
  } catch (error) {
    console.log('You can\'t switch');
    console.log('You can\'t switch');
  }
 }

 getTotal(){
  var total=0
  total=0;
  try 
  {
    for (const orderItem of this.Order.OrderItems){
      const finalPrice=orderItem.Item.ItemPrice *orderItem.ItemQuantity;
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


 OrderFromSeller(){
  this.orderFromSeller=!this.orderFromSeller
  if(this.OrderIsSelected===true){
    this.OrderIsSelected=false
  }else{
    if(this.Order!==null){
      this.OrderIsSelected=true;
    }
  }
 }
  

 pay(){
  this.goToPay=true;
  localStorage.setItem('Order', JSON.stringify(this.Order));
  this.router.navigate(['Pay']);
 }

 async send(){
    this.Order.Created=new Date();
    this.Order.OrderLocationId=1;
    this.Order.OrderLocationLevelName='Floor1';
    this.Order.OrderLocationName='Table1';
    this.Order.OrderStatus='Open';// we will tcheck the good order status after , and a thing to display if the order fall to serve or if there is not connection...
    const data= await this.orderService.createOrder(this.Order);
       if(typeof(data)==='string'){
         this.orderService.Created=true;
         this.Order=new Order;
         this.router.navigate(['/Order'])   
       }else{
         console.log('error');
       }
 }

 OrderInProgress(){
   var i=0
   if(this.Orders.length===0){
     return 0;
   }
   for(const order of this.Orders){
    if(order.OrderStatus='In Progress'){
      i++;
    }
   }
   return i;
 }
 async getOrderList(){
    if(this.permission==='cashier'){
      try {
        this.Orders=await this.orderService.getOrdersList()
      } catch (error) {
        console.log(error)
      }
      var testOrder=new Order();
      testOrder.OrderId='N1229991';
      testOrder.Created='2022-03-25 10:32:18';
      testOrder.OrderItems=[];
      testOrder.OrderLocationId=1;
      testOrder.OrderLocationLevelName='floor1',
      testOrder.OrderLocationName='table1',
      testOrder.OrderStatus='In Progress',
      testOrder.OrderTotalAmount=0;
      this.Orders.push(testOrder);
      this.Orders.push(testOrder);
    }
   }
   getColor(OrderStatus:string){
    if(OrderStatus==='Draft'){
      return 'medium'
    }else if(OrderStatus==='Paid'){
      return 'successs'
    }else{
      return 'warning'
    }
  }

  seeOrder(order:Order){
    this.Order=new Order();
   this.Order=order;
   console.log(JSON.stringify(order),'order1');
   console.log(JSON.stringify(this.Order),'order2');
   this.orderFromSeller=false;
   this.OrderIsSelected=true;
  }
  displayDate(datestring:string){
    return this.orderService.displayDate(datestring);  
   }
}
