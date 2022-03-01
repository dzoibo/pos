import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order.service';
import { Catalog,Details,Drink,Order, Slide } from '../Models';

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss'],
})
export class QuickOrderComponent implements OnInit {
  selectedLeave : string = '';
  searchValue:string='';
  id:number=1;
  noBeer:string='';
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  idCatalog=1;
  Orders:Order[];
  Order:Order;  // the Order we are currently handling;
  Catalog:Catalog[];
  CatalogTemplate:{
    choice:Catalog[];
    id:number;
  }[]=[];
  CatalogToDisplay:{
    choice:Catalog[];
    id:number;
  }=null;
  template:{
    id:number;
    items:Drink[];
    }[]=[];
  slideSize=8;
  catalogSize=4;
  hide1=true;
  hide2=true;

  constructor(private router:Router, private orderService:OrderService,private route:ActivatedRoute) {
    this.Orders=this.orderService.Orders;
    this.Catalog=this.orderService.Catalog;
   }

  ngOnInit() {// the order of these function is to important
    if(+this.route.snapshot.paramMap.get('id')>=1) {
      this.id=+this.route.snapshot.paramMap.get('id');
    } else {
      this.id=1;
    }
       
    this.getSize();
    console.log(this.router.url);
    this.getOrder();
    this.showDrink(1);
    this.searchValue="";
    this.showCatalog();
    this.CatalogToDisplay=this.CatalogTemplate[0];

    
  }
  setCatalog(action:string){
    if(action==='add'){// it means that we click to the arrow next so a containt of Catalog to display will be replace by the content of the next items 
      this.CatalogToDisplay=this.CatalogTemplate[this.CatalogToDisplay.id] // because the index of the next containt is the id of the current one 
    }else{// it means that we click on the previous arrow 
      this.CatalogToDisplay=this.CatalogTemplate[this.CatalogToDisplay.id-2] // because the index of the previous containt is the id of the current one menos 2
    }
    
  }
 showCatalog(){
  var bloc=~~(this.Catalog.length/this.catalogSize);
  var rest =(this.Catalog.length%this.catalogSize);
  for (let i=0;i<bloc ; i++){
    
    const vals = this.Catalog.slice(this.catalogSize*i,(this.catalogSize*(i+1))); 
    var newChoice={choice:vals,id:i+1}
    
    this.CatalogTemplate.push(newChoice);
  }
  if(rest>0){
    const valsRest= this.Catalog.slice(bloc*this.catalogSize,this.Catalog.length);// we recover all the items that we had not selected before 
    newChoice= {choice:valsRest,id:bloc+1}
    this.CatalogTemplate.push(newChoice);
  }
  console.log(this.CatalogTemplate) 
 }

 showDrink(idType:number,searchList:Drink[]=[]){
   this.noBeer='';
   this.template=[];
   var list :Drink[];

   if(idType<0){ //it means that this function is calling by the function that we use to do research
    list=searchList;
   }
   else{//it means that the type comme from the catalog button
        var choice:Catalog;
        this.idCatalog=idType;
        for(const catalogItem of this.Catalog){// we recove the selected type of drink
          if(catalogItem.id===idType){
            choice=catalogItem;
              list=choice.drink;
          }
      }
  }
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
        const empty:Drink={
          id:-1,
          name:"",
          price:0,
          image:"",
          model:"",
        }
        slide.items.push(empty);
      }
      this.template.push(slide);
    } 
    if(this.template.length===0){
        
      this.noBeer='No '+choice.name+' avalaible for now ; you must refresh the stock';
    }
    console.log(this.template);
 }

 getOrder(){//this function is to get the id of the order send by a router
   for (const order of this.Orders){
     if (order.orderId===this.id){
       this.Order=order;
     }
   }

}
addDrink(newDrink:Drink){
  let present=false;
  for(let drink of this.Order.orderDetails){
    if(drink.id===newDrink.id){//it means that the drink is already present
      present=true;
    }
  }

  if(present){
    this.increaseQuantity(newDrink.id)
  }
  else{
    let newSelectedDrink :Details={
        id:newDrink.id,
        image:newDrink.image,
        price:newDrink.price,
        name:newDrink.name,
        model:newDrink.model,
        Quantity:1, 
    };
     
    this.Order.orderDetails.push(newSelectedDrink)
  }
}
increaseQuantity(id:number){
  for(let drink of this.Order.orderDetails){
    if(drink.id===id){
      drink.Quantity++;
    }
  }
}
decreaseQuantity(id:number){
  for(let drink of this.Order.orderDetails){
    if(drink.id===id){
      drink.Quantity=drink.Quantity-1;
    }
  }
}
deleteDrink(Drink:Details){
  
  let index=-1;
  for(const drink of this.Order.orderDetails){
    if(drink.id===Drink.id){
      index= this.Order.orderDetails.indexOf(drink,0);  
    }
  }
  this.Order.orderDetails.splice(index,1);
}
 getQuantity(id:number){
   for (const drink of this.Order.orderDetails){
     if(drink.id===id){
       return(drink.Quantity)
     }
   }
 }
 getTotal(){
   this.Order.orderTotal=0;
  for (const drink of this.Order.orderDetails){
    const finalPrice=drink.price*drink.Quantity;
    this.Order.orderTotal=this.Order.orderTotal+finalPrice;
  }
  return this.Order.orderTotal;
 }

checkDisable(drink:Details){
  if(drink.Quantity>1){
    return false;
  }
  else{
    return true;
  }
}
checkQuantity(drink:Details){
  if(drink.Quantity>1){
    return "primary";
  }
  else{
    return "medium";
  }
}

 hideOrShow(component:number,action:string){
   if(action==="show"){
     if(component===1){
       this.hide1=true;
     }else{
       this.hide2=true;
     }
   }else{
    if(component===1){
      this.hide1=false;
    }else{
      this.hide2=false;
    }
   }
 }

 doSearch(){
   
   this.noBeer='';
   this.template=[];
   if(this.searchValue.length===0){
    this.showDrink(this.idCatalog,searchResult)
    return 0
  }
  
   if(this.searchValue.length>0){
    var searchResult:Drink[]=[];
    for (const type of this.Catalog){
      for(const drink of type.drink){
        if(drink.name.toLowerCase().indexOf(this.searchValue.toLowerCase())>-1){
          searchResult.push(drink);
        }
      }
    }
     if (searchResult.length>0){
      console.log(searchResult);
      this.showDrink(-1,searchResult)
    }
    else{
      this.noBeer="no results for your search";
    }
    
   }
   
 }

 
  getSize()
  {
    if (screen.width>=900&& screen.height>=700 ) {
      this.catalogSize=5
      this.slideSize=20;
    }

    else if (screen.width>800 && screen.height>900){
      this.slideSize=20;
      this.catalogSize=4
    }
    else if (screen.width>900){
      this.slideSize=10;
      this.catalogSize=5
    }else if (screen.width>800 && screen.height<500){
      this.slideSize=10;
      this.catalogSize=3
    }
    else {
      this.slideSize=8;
      this.catalogSize=3;
    }
  }
  
 
  choiceColor(id){
    if(this.searchValue.length>0){
      return 0
    }else{
      if(this.idCatalog===id){
      return 'medium';
    }else{
      return 'light';
    }
    }
    
  }

  
  truncate(input:string,max:number) {// i create this function only to use for a catalog menu in the small screen 
    if (input.length >=max && screen.width<900) {
       return input.substring(0, max) + '...';
    }
    else{
      return input;
    }
    
 }


 pay(){
  localStorage.setItem('Order', JSON.stringify(this.Order));
  this.router.navigate(['Pay'])
  
 }
}
