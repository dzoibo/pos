import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Order,Catalog } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  Orders:Order[];
  Catalog:Catalog[];
  result:string;
  
  constructor() { 
    this.Orders=[
            {
              orderId:1,
              orderTable:"Table1",
              orderFloor:"Floor1",
              orderTotal:0,
              orderStatus:"Started",
              orderDetails:[]},

            {
              orderId:2,
              orderTable:"Table2",
              orderFloor:"Floor1",
              orderTotal:0,
              orderStatus:"Open",
              orderDetails:[]},

          {
            orderId:3,
            orderTable:"Table3",
            orderFloor:"Floor1",
            orderTotal:0,
            orderStatus:"On hold",
            orderDetails:[]},
          {
            orderId:4,
            orderTable:"Table2",
            orderFloor:"Floor1",
            orderTotal:0,
            orderStatus:"New",
            orderDetails:[]
          },
          {
            orderId:5,
            orderTable:"Table2",
            orderFloor:"Floor1",
            orderTotal:0,
            orderStatus:"Closed",
            orderDetails:[]}
    ]

  this.Catalog=[
    {
      id:1,
      name:"beer",
      drink:[
        {
          id:1,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"GM"
        },
        {
          id:2,
          name:'Malta',
          price:750,
          image:"../../assets/malta.png",
          model:"PM"
        },
        {
          id:3,
          name:'33 Export',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        },
        {
          id:4,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        },
        {
          id:5,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"GM"
        },
        {
          id:6,
          name:'Malta',
          price:750,
          image:"../../assets/malta.png",
          model:"PM"
        },
        {
          id:7,
          name:'33 Export',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        },
        {
          id:8,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        },
        {
          id:9,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"GM"
        },
        {
          id:10,
          name:'Malta',
          price:750,
          image:"../../assets/malta.png",
          model:"PM"
        },
        {
          id:11,
          name:'33 Export',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        },
        {
          id:12,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        },
        {
          id:13,
          name:'33 Export',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        },
        {
          id:14,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        },
        {
          id:15,
          name:'Guiness',
          price:750,
          image:"../../assets/guiness.png",
          model:"GM"
        },
        {
          id:16,
          name:'Malta',
          price:750,
          image:"../../assets/malta.png",
          model:"PM"
        },
        {
          id:17,
          name:'33 Export',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        }
      ]
    },
    {
      id:2,
      name:"Juice&Water",
      drink:[
        {
          id:5,
          name:'Mango',
          price:750,
          image:"../../assets/Malta Modelo.png",
          model:"GM"
        },
        {
          id:6,
          name:'Pineapple',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        },
        {
          id:7,
          name:'OrangeJuice',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        },
        {
          id:8,
          name:'Supermont',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        }
      ]
    },

    {
      id:3,
      name:"wine",
      drink:[
        {
          id:9,
          name:'Almeshnauer',
          price:750,
          image:"../../assets/guiness.png",
          model:"GM"
        },
        {id:10,
          name:'Jp Chenet',
          price:750,
          image:"../../assets/guiness.png",
          model:"GM"
        },
        {
          id:11,
          name:'El vino',
          price:750,
          image:"../../assets/33.png",
          model:"GM"
        },
        {id:12,
          name:'Vinosol',
          price:750,
          image:"../../assets/guiness.png",
          model:"PM"
        }
      ]
    },
    {
      id:4,
      name:"Cocktail",
      drink:[]
    },
    {
      id:5,
      name:"Whisky",
      drink:[],
    },
    {
      id:6,
      name:"Champagne",
      drink:[]
    },
    {
      id:7,
      name:"Lite",
      drink:[],
    },
    {
      id:8,
      name:"LocalDrink",
      drink:[],
    },
    {
      id:9,
      name:"Special",
      drink:[],
    }

  ]
  
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
   if(order.orderId===Order.orderId){
     this.Orders.splice(this.Orders.indexOf(order),1); 
   }
 }
 Order.orderStatus='Closed';
 this.Orders.push(Order);
 return Promise.resolve(this.Orders);
}

}
