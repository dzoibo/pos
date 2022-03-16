import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Order,Catalog,User } from '../Models';
import { LoginService,CatalogService,OrderService } from 'poslibrary';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  Orders: Order[] ;
  Catalog:Catalog[];
  result:string;
  
   constructor(private loginService:LoginService,private catalogService:CatalogService,private orderService:OrderService) { 
  /*  this.Orders=[
            {
              OrderId: "1",
              OrderLocationName: "Table1",
              OrderLocationLevelName: "Floor1",
              OrderTotalAmount: 0,
              OrderStatus:"Started",
              Created: null,
              OrderItems:[],
              OrderLocationId:0
            },
            {
              OrderId: "2",
              OrderLocationName: "Table2",
              OrderLocationLevelName: "Floor1",
              OrderTotalAmount: 0,
              OrderStatus:"Open",
              Created: null,
              OrderItems:[],
              OrderLocationId:0
            },
            {
              OrderId: "3",
              OrderLocationName: "Table3",
              OrderLocationLevelName: "Floor1",
              OrderTotalAmount: 0,
              OrderStatus:"On hold",
              Created: null,
              OrderItems:[],
              OrderLocationId:0 
            },
            {
              OrderId: "4",
              OrderLocationName: "Table2",
              OrderLocationLevelName: "Floor1",
              OrderTotalAmount: 0,
              OrderStatus:"New",
              Created: null,
              OrderItems:[],
              OrderLocationId:0
            },
            {
              OrderId: "5",
              OrderLocationName: "Table2",
              OrderLocationLevelName: "Floor1",
              OrderTotalAmount: 0,
              OrderStatus:"Closed",
              Created: null,
              OrderItems:[],
              OrderLocationId:0
            }
    ]*/ 

/* this.Catalog=[
    { 
      CatalogId:1,
      CatalogImage:'',
      CatalogName:"beer",
      CatalogDescription:"",
      CatalogItems:[
          {
            ItemId:1,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:2,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Malta',
            ItemPrice:750,
            ItemImage:"../../assets/malta.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:3,
            ItemDescription:'beer with malt and guiness',
            ItemName:'33 Export',
            ItemPrice:750,
            ItemImage:"../../assets/33.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:4,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:5,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:6,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Malta',
            ItemPrice:750,
            ItemImage:"../../assets/malta.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:7,
            ItemDescription:'beer with malt and guiness',
            ItemName:'33 Export',
            ItemPrice:750,
            ItemImage:"../../assets/33.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:8,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:9,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:10,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Malta',
            ItemPrice:750,
            ItemImage:"../../assets/malta.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:11,
            ItemDescription:'beer with malt and guiness',
            ItemName:'33 Export',
            ItemPrice:750,
            ItemImage:"../../assets/33.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:12,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:13,
            ItemDescription:'beer with malt and guiness',
            ItemName:'33 Export',
            ItemPrice:750,
            ItemImage:"../../assets/33.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:14,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:15,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Guiness',
            ItemPrice:750,
            ItemImage:"../../assets/guiness.png",
            ItemModels:"GM",
            ItemProvider:''
          },
          {
            ItemId:16,
            ItemDescription:'beer with malt and guiness',
            ItemName:'Malta',
            ItemPrice:750,
            ItemImage:"../../assets/malta.png",
            ItemModels:"PM",
            ItemProvider:''
          },
          {
            ItemId:17,
            ItemDescription:'beer with malt and guiness',
            ItemName:'33 Export',
            ItemPrice:750,
            ItemImage:"../../assets/33.png",
            ItemModels:"GM",
            ItemProvider:''
          }
        ]
    },
    {
      CatalogId:2,
      CatalogImage:'',
      CatalogName:"Juice&Water",
      CatalogDescription:"",
      CatalogItems:[
        {
          ItemId:5,
            ItemDescription:'beer with malt and guiness',
          ItemName:'Mango',
          ItemPrice:750,
          ItemImage:"../../assets/Malta Modelo.png",
          ItemModels:"GM",
          ItemProvider:''
        },
        {
          ItemId:6,
          ItemDescription:'beer with malt and guiness',
          ItemName:'Pineapple',
          ItemPrice:750,
          ItemImage:"../../assets/guiness.png",
          ItemModels:"PM",
          ItemProvider:''
        },
        {
          ItemId:7,
          ItemDescription:'beer with malt and guiness',
          ItemName:'OrangeJuice',
          ItemPrice:750,
          ItemImage:"../../assets/33.png",
          ItemModels:"GM",
          ItemProvider:''
        },
        {
          ItemId:8,
          ItemDescription:'beer with malt and guiness',
          ItemName:'Supermont',
          ItemPrice:750,
          ItemImage:"../../assets/guiness.png",
          ItemModels:"PM",
          ItemProvider:''
        }
      ]
    },

    {
      CatalogId:3,
      CatalogImage:'',
      CatalogName:"wine",
      CatalogDescription:"",
      CatalogItems:[
        {
          ItemId:9,
          ItemDescription:'beer with malt and guiness',
          ItemName:'Almeshnauer',
          ItemPrice:750,
          ItemImage:"../../assets/guiness.png",
          ItemModels:"GM",
          ItemProvider:''
        },
        {ItemId:10,
          ItemDescription:'beer with malt and guiness',
          ItemName:'Jp Chenet',
          ItemPrice:750,
          ItemImage:"../../assets/guiness.png",
          ItemModels:"GM",
          ItemProvider:''
        },
        {
          ItemId:11,
          ItemDescription:'beer with malt and guiness',
          ItemName:'El vino',
          ItemPrice:750,
          ItemImage:"../../assets/33.png",
          ItemModels:"GM",
          ItemProvider:''
        },
        {ItemId:12,
          ItemDescription:'beer with malt and guiness',
          ItemName:'Vinosol',
          ItemPrice:750,
          ItemImage:"../../assets/guiness.png",
          ItemModels:"PM",
          ItemProvider:''
        }
      ]
    },
    {
      CatalogId:4,
      CatalogImage:'',
      CatalogName:"Cocktail",
      CatalogDescription:"",
      CatalogItems:[]
    },
    {
      CatalogId:5,
      CatalogImage:'',
      CatalogName:"Whisky",
      CatalogDescription:"",
      CatalogItems:[],
    },
    {
      CatalogId:6,
      CatalogImage:'',
      CatalogName:"Champagne",
      CatalogDescription:"",
      CatalogItems:[]
    },
    {
      CatalogId:7,
      CatalogImage:'',
      CatalogName:"Lite",
      CatalogDescription:"",
      CatalogItems:[],
    },
    {
      CatalogId:8,
      CatalogImage:'',
      CatalogName:"LocalDrink",
      CatalogDescription:"",
      CatalogItems:[],
    },
    {
      CatalogId:9,
      CatalogImage:'',
      CatalogName:"Special",
      CatalogDescription:"",
      CatalogItems:[],
    }

  ]  */ 
  
  }
  

 /* GetUser(userName:string,passWord:string):any{
    this.loginService.login(userName, passWord).subscribe((data: any) => { 
      console.log(data.WindowTabData);
      if(data.WindowTabData.Error){
        console.log(data.WindowTabData.Error);
        return false;
      }else{
        var userinfo=data.WindowTabData.DataSet.DataRow.field;
        this.User.userId=userinfo[0].val;
        this.User.userName=userinfo[1].val;
        this.User.userParner='Cashier';
        this.User.userImage='../assets/pp.png';
        return this.User;
      }
    });
    
  }

  getUserss(){
    return this.loginService.login('', '');
  }
  */
  async getCatalog(catalogId:number,itemId:number){
    const data = await this.catalogService.getCatalog(catalogId,itemId);
    console.log('ddytfdtrdt', data, catalogId, itemId)
    return data
  }

  async getNewOrderId(){
    const data:any=await this.orderService.draftOrder()
    return data;
  }

  

  
 
  SendByOM(tel: number, montant: number):Promise<string>{
    return new Promise(
      (resolve, reject) => {
        this.send(tel, montant).then(// Ceci va acceder à la promesse retournée par la fonction send et maintenant dans le template ou on appelera notre fonction on pourra donc afficher un contenu en fonction du résulat obtenu par cette promise
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
}

send(tel:number,montant:number) {// fonction qui appellera la requette http pour envoyer les données au backend
  var resultat;
  if(tel===404){// toute cette serie de condition n'est qu'une vérification pour formater le résultat à afficher la vraie verification se fera dans la partie serveur
    resultat='connection'; 
  }else if (tel===10000){
    resultat='error';
  }else{
    resultat='done';
  }
  return Promise.resolve(resultat);
}


saveOrder(Order:Order){// this function will also return promise wich will be suppose to send the new state of orther to the backend after every change in each component 
 for (const order of this.Orders){
   if(order.OrderId===Order.OrderId){
     this.Orders.splice(this.Orders.indexOf(order),1); 
   }
 }
 Order.OrderStatus='Closed';
 this.Orders.push(Order);
 return Promise.resolve(this.Orders);
}

}
